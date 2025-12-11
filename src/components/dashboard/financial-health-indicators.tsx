"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface HealthIndicatorsProps {
  dependencyOnPrimary: number; // نسبة الاعتماد على الدخل الأساسي
  expenseRatio: number; // نسبة المصروفات من الدخل
  savingsRate: number; // معدل الادخار
  incomeStability: number; // استقرار الدخل (أساسي + مشترك)
  overallScore: number; // التقييم العام (0-100)
}

export function FinancialHealthIndicators({
  dependencyOnPrimary,
  expenseRatio,
  savingsRate,
  incomeStability,
  overallScore,
}: HealthIndicatorsProps) {
  const getIndicatorStatus = (value: number, thresholds: { good: number; warning: number }, reverse = false) => {
    if (reverse) {
      if (value <= thresholds.good) return { color: "bg-green-500", textColor: "text-green-600", status: "✅" };
      if (value <= thresholds.warning) return { color: "bg-yellow-500", textColor: "text-yellow-600", status: "⚠️" };
      return { color: "bg-red-500", textColor: "text-red-600", status: "❌" };
    } else {
      if (value >= thresholds.good) return { color: "bg-green-500", textColor: "text-green-600", status: "✅" };
      if (value >= thresholds.warning) return { color: "bg-yellow-500", textColor: "text-yellow-600", status: "⚠️" };
      return { color: "bg-red-500", textColor: "text-red-600", status: "❌" };
    }
  };

  const getOverallRating = (score: number) => {
    if (score >= 90) return { text: "ممتازة", emoji: "🌟🌟🌟🌟🌟", color: "text-green-600" };
    if (score >= 75) return { text: "جيدة جداً", emoji: "🌟🌟🌟🌟", color: "text-blue-600" };
    if (score >= 60) return { text: "جيدة", emoji: "🌟🌟🌟", color: "text-yellow-600" };
    if (score >= 40) return { text: "مقبولة", emoji: "🌟🌟", color: "text-orange-600" };
    return { text: "تحتاج تحسين", emoji: "🌟", color: "text-red-600" };
  };

  const indicators = [
    {
      id: 1,
      title: "نسبة الاعتماد على الدخل الأساسي",
      value: dependencyOnPrimary,
      status: getIndicatorStatus(dependencyOnPrimary, { good: 60, warning: 80 }, true),
      description: dependencyOnPrimary <= 60
        ? "✅ متوازن - لديك مصادر دخل متنوعة"
        : dependencyOnPrimary <= 80
        ? "⚠️ جيد - لكن يمكن تحسين التنويع"
        : "❌ عالي - حاول تنويع مصادر دخلك",
    },
    {
      id: 2,
      title: "نسبة المصروفات من الدخل",
      value: expenseRatio,
      status: getIndicatorStatus(expenseRatio, { good: 70, warning: 80 }, true),
      description: expenseRatio <= 70
        ? "✅ ممتاز - تحت الحد الموصى به (80%)"
        : expenseRatio <= 80
        ? "⚠️ جيد - قريب من الحد الموصى به"
        : "❌ مرتفع - حاول تقليل المصروفات",
    },
    {
      id: 3,
      title: "معدل الادخار الشهري",
      value: savingsRate,
      status: getIndicatorStatus(savingsRate, { good: 20, warning: 10 }),
      description: savingsRate >= 20
        ? "✅ ممتاز - فوق الحد الموصى به (20%)"
        : savingsRate >= 10
        ? "⚠️ جيد - لكن يمكن زيادته"
        : "❌ منخفض - حاول زيادة الادخار",
    },
    {
      id: 4,
      title: "استقرار الدخل",
      value: incomeStability,
      status: getIndicatorStatus(incomeStability, { good: 60, warning: 40 }),
      description: incomeStability >= 60
        ? "✅ جيد - معظم دخلك مستقر"
        : incomeStability >= 40
        ? "⚠️ مقبول - حاول زيادة الدخل المستقر"
        : "❌ متغير - ركز على مصادر دخل مستقرة",
    },
  ];

  const overallRating = getOverallRating(overallScore);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          🏥 مؤشرات الصحة المالية
        </CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          تقييم شامل لوضعك المالي الحالي
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {indicators.map((indicator) => (
          <div key={indicator.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{indicator.status.status}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {indicator.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {indicator.description}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${indicator.status.textColor}`}>
                  {indicator.value.toFixed(1)}%
                </div>
              </div>
            </div>
            <Progress
              value={indicator.value}
              className={`h-3 ${indicator.status.color.replace('bg-', 'bg-')}`}
            />
          </div>
        ))}

        {/* التقييم العام */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                📊 التقييم العام
              </div>
              <div className={`text-3xl font-bold ${overallRating.color}`}>
                صحة مالية {overallRating.text}
              </div>
              <div className="text-2xl mt-2">{overallRating.emoji}</div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-gray-900 dark:text-white">
                {overallScore}
              </div>
              <div className="text-sm text-gray-500">من 100</div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={overallScore} className="h-4 bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
