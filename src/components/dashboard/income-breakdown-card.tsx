"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Briefcase, PiggyBank, Users, TrendingUp, TrendingDown, Lock } from "lucide-react";

interface IncomeBreakdownProps {
  primary: {
    amount: number;
    percentage: number;
    change: number;
    isStable: boolean;
  };
  secondary: {
    amount: number;
    percentage: number;
    change: number;
    isStable: boolean;
  };
  shared: {
    amount: number;
    percentage: number;
    change: number;
    yourShare: number;
    isStable: boolean;
  };
  total: number;
}

export function IncomeBreakdownCard({
  primary,
  secondary,
  shared,
  total,
}: IncomeBreakdownProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          📊 تحليل مصادر الدخل
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الدخل الأساسي */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  💼 الدخل الأساسي
                </div>
                <div className="text-xs text-gray-500">الراتب الشهري</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(primary.amount)}
              </div>
              <div className="text-sm text-gray-500">{primary.percentage.toFixed(1)}%</div>
            </div>
          </div>
          <Progress value={primary.percentage} className="h-3 bg-blue-100" />
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">
                {primary.isStable ? "مستقر" : "متغير"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {primary.change >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span
                className={`${primary.change >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {primary.change === 0 ? "ثابت" : formatPercentage(primary.change)}
              </span>
            </div>
          </div>
        </div>

        {/* الدخل الجانبي */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <PiggyBank className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  🐷 الدخل الجانبي
                </div>
                <div className="text-xs text-gray-500">عمل حر + استثمارات</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(secondary.amount)}
              </div>
              <div className="text-sm text-gray-500">{secondary.percentage.toFixed(1)}%</div>
            </div>
          </div>
          <Progress value={secondary.percentage} className="h-3 bg-purple-100" />
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-600 dark:text-gray-400">
                {secondary.isStable ? "🔒 مستقر" : "⚡ متغير"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {secondary.change >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span
                className={`${secondary.change >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {secondary.change === 0
                  ? "ثابت"
                  : `${formatPercentage(secondary.change)} عن الشهر الماضي`}
              </span>
            </div>
          </div>
        </div>

        {/* الدخل المشترك */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  👥 الدخل المشترك
                </div>
                <div className="text-xs text-gray-500">عائلتنا (إيجار عقار)</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(shared.amount)}
              </div>
              <div className="text-sm text-gray-500">{shared.percentage.toFixed(1)}%</div>
            </div>
          </div>
          <Progress value={shared.percentage} className="h-3 bg-orange-100" />
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">
                {shared.isStable ? "مستقر" : "متغير"}
              </span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              حصتك: {formatCurrency(shared.yourShare)}
            </div>
          </div>
        </div>

        {/* الإجمالي */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg text-gray-900 dark:text-white">الإجمالي</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(total)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
