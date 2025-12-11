import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { stripe, STRIPE_PLANS } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: "غير مصرح" },
        { status: 401 }
      )
    }

    const { planType } = await req.json()

    if (!planType || !STRIPE_PLANS[planType as keyof typeof STRIPE_PLANS]) {
      return NextResponse.json(
        { error: "نوع الخطة غير صحيح" },
        { status: 400 }
      )
    }

    const priceId = STRIPE_PLANS[planType as keyof typeof STRIPE_PLANS]

    // إنشاء جلسة Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
      customer_email: session.user.email,
      client_reference_id: session.user.id,
      metadata: {
        userId: session.user.id,
        planType: planType,
      },
      // فترة تجريبية مجانية 30 يوم
      subscription_data: {
        trial_period_days: 30,
        trial_settings: {
          end_behavior: {
            missing_payment_method: "cancel",
          },
        },
      },
      // تجميع طريقة الدفع أثناء الفترة التجريبية
      payment_method_collection: "always",
    })

    return NextResponse.json({ 
      sessionId: checkoutSession.id,
      url: checkoutSession.url 
    })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء جلسة الدفع" },
      { status: 500 }
    )
  }
}
