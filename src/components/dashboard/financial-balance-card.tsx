"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface BalanceItem {
  income: number;
  expenses: number;
  surplus: number;
  coverage: number;
}

interface FinancialBalanceProps {
  primary: BalanceItem & { label: string };
  secondary: BalanceItem & { label: string };
  shared: BalanceItem & { label: string };
}

export function FinancialBalanceCard({
  primary,
  secondary,
  shared,
}: FinancialBalanceProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (coverage: number) => {
    if (coverage >= 100) {
      return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    }
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  };

  const getStatusText = (coverage: number) => {
    if (coverage >= 120) return { text: "ممتاز!", color: "text-green-600" };
    if (coverage >= 100) return { text: "جيد", color: "text-blue-600" };
    if (coverage >= 80) return { text: "مقبول", color: "text-yellow-600" };
    return { text: "تحذير", color: "text-red-600" };
  };

  const renderBalanceSection = (
    title: string,
    emoji: string,
    item: BalanceItem,
    incomeLabel: string,
    expensesLabel: string,
    color: string
  ) => {
    const status = getStatusText(item.coverage);
    const expensePercentage = (item.expenses / item.income) * 100;

    return (
      <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {emoji} {title}
          </h3>
          <div className="flex items-center gap-2">
            {getStatusIcon(item.coverage)}
            <span className={`font-medium ${status.color}`}>{status.text}</span>
          </div>
        </div>

        {/* الدخل */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{incomeLabel}</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(item.income)}
            </span>
          </div>
          <Progress value={100} className={`h-2 ${color}`} />
          <div className="text-xs text-right text-gray-500">100%</div>
        </div>

        {/* المصروفات */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{expensesLabel}</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(item.expenses)}
            </span>
          </div>
          <Progress
            value={expensePercentage}
            className={`h-2 ${
              expensePercentage > 100 ? "bg-red-200" : "bg-gray-200"
            }`}
          />
          <div className="text-xs text-right text-gray-500">
            {expensePercentage.toFixed(1)}%
          </div>
        </div>

        {/* الفائض */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              💡 الفائض
            </span>
            <span
              className={`text-lg font-bold ${
                item.surplus >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(item.surplus)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {item.surplus >= 0
              ? `✅ ${status.text}! دخلك يغطي مصروفاتك + فائض`
              : `⚠️ تحذير! مصروفاتك تتجاوز دخلك`}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          ⚖️ التوازن المالي
        </CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          مقارنة الدخل والمصروفات لكل نوع
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* الدخل الأساسي */}
        {renderBalanceSection(
          primary.label,
          "💼",
          primary,
          `الدخل الأساسي (${formatCurrency(primary.income)})`,
          "المصروفات الأساسية",
          "bg-blue-500"
        )}

        {/* الدخل الجانبي */}
        {renderBalanceSection(
          secondary.label,
          "🐷",
          secondary,
          `الدخل الجانبي (${formatCurrency(secondary.income)})`,
          "المصروفات الاختيارية",
          "bg-purple-500"
        )}

        {/* الدخل المشترك */}
        {renderBalanceSection(
          shared.label,
          "👥",
          shared,
          `الدخل المشترك (${formatCurrency(shared.income)})`,
          "المصروفات المشتركة",
          "bg-orange-500"
        )}
      </CardContent>
    </Card>
  );
}
