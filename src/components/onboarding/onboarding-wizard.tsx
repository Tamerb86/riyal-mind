"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Wallet, 
  TrendingDown, 
  Target, 
  Users, 
  Calendar, 
  FileText,
  Sparkles,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface WizardStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
  features: string[]
}

const wizardSteps: WizardStep[] = [
  {
    id: 1,
    title: "مرحباً بك في ريال مايند! 👋",
    description: "تطبيقك الذكي لإدارة المصاريف والميزانية بسهولة",
    icon: <Sparkles className="w-16 h-16" />,
    color: "from-purple-500 to-pink-500",
    features: [
      "إدارة مصاريفك اليومية بسهولة",
      "تتبع دخلك وميزانيتك",
      "تقارير ذكية ومفصلة",
      "حماية بياناتك بأعلى معايير الأمان"
    ]
  },
  {
    id: 2,
    title: "سجل مصاريفك بسرعة 💰",
    description: "أضف مصاريفك في ثوانٍ معدودة",
    icon: <TrendingDown className="w-16 h-16" />,
    color: "from-blue-500 to-cyan-500",
    features: [
      "إضافة مصروف جديد بنقرة واحدة",
      "تصنيف تلقائي للمصاريف (طعام، مواصلات، ترفيه...)",
      "إضافة ملاحظات وتفاصيل لكل مصروف",
      "مسح الفواتير بالكاميرا (قريباً)"
    ]
  },
  {
    id: 3,
    title: "تحكم في ميزانيتك 🎯",
    description: "حدد حدود الإنفاق لكل فئة",
    icon: <Target className="w-16 h-16" />,
    color: "from-green-500 to-emerald-500",
    features: [
      "تحديد ميزانية شهرية لكل فئة",
      "تنبيهات ذكية عند تجاوز 80% من الحد",
      "مقارنة الإنفاق بالميزانية المخططة",
      "توصيات ذكية للتوفير"
    ]
  },
  {
    id: 4,
    title: "الحساب العائلي المشترك 👨‍👩‍👧‍👦",
    description: "شارك المصاريف مع عائلتك أو أصدقائك",
    icon: <Users className="w-16 h-16" />,
    color: "from-orange-500 to-red-500",
    features: [
      "إنشاء مجموعات عائلية أو مع الأصدقاء",
      "تسجيل المصاريف المشتركة",
      "تقسيم تلقائي للمصاريف بين الأعضاء",
      "معرفة من يدين لمن بالضبط"
    ]
  },
  {
    id: 5,
    title: "المناسبات والأهداف 🎉",
    description: "خطط لمناسباتك وحقق أهدافك المالية",
    icon: <Calendar className="w-16 h-16" />,
    color: "from-indigo-500 to-purple-500",
    features: [
      "إضافة مناسبات (رمضان، عيد، مدارس...)",
      "تخصيص ميزانية خاصة لكل مناسبة",
      "تحديد أهداف ادخارية",
      "تتبع تقدمك نحو أهدافك"
    ]
  },
  {
    id: 6,
    title: "تقارير ذكية ومفصلة 📊",
    description: "افهم عاداتك المالية بوضوح",
    icon: <FileText className="w-16 h-16" />,
    color: "from-pink-500 to-rose-500",
    features: [
      "تقارير شهرية وسنوية تفصيلية",
      "رسوم بيانية توضح نمط إنفاقك",
      "مقارنة بين الأشهر المختلفة",
      "تصدير التقارير بصيغة PDF"
    ]
  }
]

interface OnboardingWizardProps {
  onComplete: () => void
  onSkip: () => void
}

export function OnboardingWizard({ onComplete, onSkip }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onSkip()
  }

  const step = wizardSteps[currentStep]
  
  if (!step) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="relative w-full max-w-3xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label="تخطي"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800">
          <motion.div
            className={`h-full bg-gradient-to-r ${step.color}`}
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / wizardSteps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Icon */}
              <div className="flex justify-center">
                <motion.div
                  className={`p-6 rounded-full bg-gradient-to-br ${step.color} text-white shadow-lg`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {step.icon}
                </motion.div>
              </div>

              {/* Title */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 max-w-xl mx-auto">
                {step.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className={`mt-0.5 p-1 rounded-full bg-gradient-to-br ${step.color}`}>
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-right flex-1">
                      {feature}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Step Indicators */}
              <div className="flex justify-center gap-2 pt-4">
                {wizardSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStep
                        ? `w-8 bg-gradient-to-r ${step.color}`
                        : "w-2 bg-gray-300 dark:bg-gray-700"
                    }`}
                    aria-label={`الانتقال للخطوة ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  السابق
                </Button>

                <Button
                  onClick={handleSkip}
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  تخطي الجولة
                </Button>

                <Button
                  onClick={handleNext}
                  className={`flex items-center gap-2 bg-gradient-to-r ${step.color} hover:opacity-90 text-white`}
                >
                  {currentStep === wizardSteps.length - 1 ? "ابدأ الآن" : "التالي"}
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </div>
  )
}
