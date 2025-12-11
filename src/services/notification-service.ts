import { prisma } from "@/config/db"

/**
 * إنشاء تنبيه ميزانية عند تجاوز النسبة المحددة
 */
export async function createBudgetAlert(
  userId: string,
  categoryId: number,
  budgetId: string,
  percentage: number
): Promise<void> {
  try {
    const title = percentage >= 100 
      ? "⚠️ تجاوز الميزانية" 
      : "⚠️ اقتراب من تجاوز الميزانية"
    
    const description = percentage >= 100
      ? `لقد تجاوزت ميزانية هذه الفئة بنسبة ${Math.round(percentage)}%`
      : `لقد استخدمت ${Math.round(percentage)}% من ميزانية هذه الفئة`

    await prisma.notification.create({
      data: {
        userId,
        type: "BUDGET_ALERT",
        title,
        description,
        data: {
          budgetId,
          categoryId,
          percentage,
        },
      },
    })
  } catch (error) {
    console.error("Error creating budget alert:", error)
  }
}

/**
 * إنشاء إشعار عند تحديث تقدم الهدف
 */
export async function createGoalNotification(
  userId: string,
  goalId: string,
  goalName: string,
  percentage: number
): Promise<void> {
  try {
    let title = ""
    let description = ""

    if (percentage >= 100) {
      title = "🎉 تم إكمال الهدف!"
      description = `تهانينا! لقد حققت هدف "${goalName}"`
    } else if (percentage >= 75) {
      title = "🚀 تقدم ممتاز"
      description = `أنت قريب من تحقيق هدف "${goalName}" - ${Math.round(percentage)}% مكتمل`
    } else if (percentage >= 50) {
      title = "💪 استمر بالعمل الجيد"
      description = `لقد وصلت إلى ${Math.round(percentage)}% من هدف "${goalName}"`
    } else if (percentage >= 25) {
      title = "📊 تقدم جيد"
      description = `لقد أكملت ${Math.round(percentage)}% من هدف "${goalName}"`
    }

    if (title) {
      await prisma.notification.create({
        data: {
          userId,
          type: "GOAL_PROGRESS",
          title,
          description,
          data: {
            goalId,
            goalName,
            percentage,
          },
        },
      })
    }
  } catch (error) {
    console.error("Error creating goal notification:", error)
  }
}

/**
 * إنشاء تذكير للمناسبات القريبة
 */
export async function createOccasionReminder(
  userId: string,
  occasionId: string,
  occasionName: string,
  daysUntil: number
): Promise<void> {
  try {
    let title = ""
    let description = ""

    if (daysUntil === 0) {
      title = "🎉 اليوم!"
      description = `مناسبة "${occasionName}" هي اليوم`
    } else if (daysUntil === 1) {
      title = "⏰ غداً"
      description = `مناسبة "${occasionName}" غداً`
    } else if (daysUntil <= 7) {
      title = "📅 قريباً"
      description = `مناسبة "${occasionName}" بعد ${daysUntil} أيام`
    } else if (daysUntil <= 30) {
      title = "📆 تذكير"
      description = `مناسبة "${occasionName}" بعد ${daysUntil} يوم`
    }

    if (title) {
      await prisma.notification.create({
        data: {
          userId,
          type: "OTHER",
          title,
          description,
          data: {
            occasionId,
            occasionName,
            daysUntil,
          },
        },
      })
    }
  } catch (error) {
    console.error("Error creating occasion reminder:", error)
  }
}

/**
 * فحص جميع الميزانيات وإنشاء تنبيهات إذا لزم الأمر
 */
export async function checkBudgetsAndAlert(): Promise<void> {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const budgets = await prisma.budget.findMany({
      include: {
        user: true,
      },
    })

    for (const budget of budgets) {
      if (!budget.user.budgetAlerts) continue

      const expenses = await prisma.expense.findMany({
        where: {
          userId: budget.userId,
          categoryId: budget.categoryId,
          date: { gte: startOfMonth },
        },
      })

      const spent = expenses.reduce((sum, exp) => sum + exp.amount, 0)
      const percentage = (spent / budget.monthlyAmount) * 100

      if (percentage >= 80) {
        const recentAlert = await prisma.notification.findFirst({
          where: {
            userId: budget.userId,
            type: "BUDGET_ALERT",
            createdAt: {
              gte: new Date(now.getTime() - 24 * 60 * 60 * 1000), // آخر 24 ساعة
            },
          },
        })

        if (!recentAlert) {
          await createBudgetAlert(
            budget.userId,
            budget.categoryId,
            budget.id,
            percentage
          )
        }
      }
    }
  } catch (error) {
    console.error("Error checking budgets:", error)
  }
}

/**
 * فحص المناسبات القريبة وإنشاء تذكيرات
 */
export async function checkOccasionsAndRemind(): Promise<void> {
  try {
    const now = new Date()
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const upcomingOccasions = await prisma.occasion.findMany({
      where: {
        date: {
          gte: now,
          lte: sevenDaysLater,
        },
      },
      include: {
        user: true,
      },
    })

    for (const occasion of upcomingOccasions) {
      const daysUntil = Math.ceil(
        (new Date(occasion.date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      )

      // تحقق من عدم وجود تذكير حديث
      const recentReminder = await prisma.notification.findFirst({
        where: {
          userId: occasion.userId,
          data: {
            path: ["occasionId"],
            equals: occasion.id,
          },
          createdAt: {
            gte: new Date(now.getTime() - 24 * 60 * 60 * 1000),
          },
        },
      })

      if (!recentReminder) {
        await createOccasionReminder(
          occasion.userId,
          occasion.id,
          occasion.name,
          daysUntil
        )
      }
    }
  } catch (error) {
    console.error("Error checking occasions:", error)
  }
}
