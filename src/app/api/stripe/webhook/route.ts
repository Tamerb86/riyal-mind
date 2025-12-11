import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/config/db"
import Stripe from "stripe"

export async function POST(req: NextRequest) {
  // التحقق من وجود Stripe
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 }
    )
  }

  const body = await req.text()
  const signature = headers().get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "No signature" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        
        // تفعيل الاشتراك للمستخدم
        if (session.client_reference_id && session.subscription) {
          // جلب معلومات الاشتراك للحصول على تاريخ نهاية الفترة التجريبية
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          )
          
          const updateData: any = {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            subscriptionStatus: subscription.status,
            subscriptionPlan: session.metadata?.planType || "individual_monthly",
          }
          
          // إذا كانت هناك فترة تجريبية
          if (subscription.trial_end) {
            updateData.trialEndsAt = new Date(subscription.trial_end * 1000)
            updateData.hasUsedTrial = true
          }
          
          await prisma.user.update({
            where: { id: session.client_reference_id },
            data: updateData,
          })

          // إنشاء إشعار للمستخدم
          await prisma.notification.create({
            data: {
              userId: session.client_reference_id,
              type: "OTHER",
              title: "تم تفعيل اشتراكك بنجاح",
              description: "مرحباً بك في ريال مايند! اشتراكك الآن نشط.",
            },
          })
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        
        // تحديث حالة الاشتراك
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            subscriptionStatus: subscription.status,
          },
        })
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        
        // إلغاء الاشتراك
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            subscriptionStatus: "canceled",
            stripeSubscriptionId: null,
          },
        })
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        
        // تسجيل الفاتورة الناجحة
        const subscriptionId = typeof (invoice as any).subscription === 'string' ? (invoice as any).subscription : (invoice as any).subscription?.id
        if (subscriptionId) {
          const user = await prisma.user.findFirst({
            where: { stripeSubscriptionId: subscriptionId },
          })

          if (user) {
            await prisma.notification.create({
              data: {
                userId: user.id,
                type: "OTHER",
                title: "تم الدفع بنجاح",
                description: `تم دفع فاتورة بقيمة ${(invoice.amount_paid / 100).toFixed(2)} ريال`,
              },
            })
          }
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        
        // إشعار بفشل الدفع
        const subscriptionId = typeof (invoice as any).subscription === 'string' ? (invoice as any).subscription : (invoice as any).subscription?.id
        if (subscriptionId) {
          const user = await prisma.user.findFirst({
            where: { stripeSubscriptionId: subscriptionId },
          })

          if (user) {
            await prisma.notification.create({
              data: {
                userId: user.id,
                type: "OTHER",
                title: "فشل الدفع",
                description: "فشلت عملية الدفع. يرجى تحديث طريقة الدفع الخاصة بك.",
              },
            })
          }
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
