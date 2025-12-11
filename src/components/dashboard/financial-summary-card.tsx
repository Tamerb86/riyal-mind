"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Wallet } from "lucide-react";

interface FinancialSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  incomeChange: number;
  expensesChange: number;
  savingsChange: number;
  savingsRate: number;
  healthStatus: "excellent" | "good" | "fair" | "poor";
}

export function FinancialSummaryCard({
  totalIncome,
  totalExpenses,
  savings,
  incomeChange,
  expensesChange,
  savingsChange,
  savingsRate,
  healthStatus,
}: FinancialSummaryProps) {
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

  const getHealthStatusText = () => {
    switch (healthStatus) {
      case "excellent":
        return { text: "ممتازة", emoji: "✅", color: "text-green-600" };
      case "good":
        return { text: "جيدة", emoji: "👍", color: "text-blue-600" };
      case "fair":
        return { text: "مقبولة", emoji: "⚠️", color: "text-yellow-600" };
      case "poor":
        return { text: "تحتاج تحسين", emoji: "⚠️", color: "text-red-600" };
    }
  };

  const healthInfo = getHealthStatusText();

  return (
    <Card className="col-span-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          💰 الملخص المالي الشهري
          <span className="text-sm font-normal text-muted-foreground">
            - {new Date().toLocaleDateString("ar-SA", { month: "long", year: "numeric" })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* إجمالي الدخل */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  📥 إجمالي الدخل
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalIncome)}
              </div>
              <div className="flex items-center gap-1 mt-2">
                {incomeChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={`text-sm font-medium ${
                    incomeChange >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatPercentage(incomeChange)}
                </span>
                <span className="text-xs text-gray-500">عن الشهر الماضي</span>
              </div>
            </div>
          </div>

          {/* المصروفات */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                  <Wallet className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  📤 المصروفات
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalExpenses)}
              </div>
              <div className="flex items-center gap-1 mt-2">
                {expensesChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-red-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-600" />
                )}
                <span
                  className={`text-sm font-medium ${
                    expensesChange >= 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {formatPercentage(expensesChange)}
                </span>
                <span className="text-xs text-gray-500">عن الشهر الماضي</span>
              </div>
            </div>
          </div>

          {/* المتبقي */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <PiggyBank className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  💵 المتبقي
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(savings)}
              </div>
              <div className="flex items-center gap-1 mt-2">
                {savingsChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={`text-sm font-medium ${
                    savingsChange >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatPercentage(savingsChange)}
                </span>
                <span className="text-xs text-gray-500">عن الشهر الماضي</span>
              </div>
            </div>
          </div>
        </div>

        {/* الحالة المالية */}
        <div className="mt-6 flex items-center justify-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              معدل الادخار:
            </span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {savingsRate.toFixed(1)}% 📊
            </span>
          </div>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              الحالة:
            </span>
            <span className={`text-lg font-bold ${healthInfo.color}`}>
              {healthInfo.text} {healthInfo.emoji}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
