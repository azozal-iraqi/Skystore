import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { Check, MessageCircle, Zap, Crown, Star } from "lucide-react";

interface SubscriptionPageProps {
  onCodeActivated: (code: string) => void;
}

export default function SubscriptionPage({ onCodeActivated }: SubscriptionPageProps) {
  const { t, lang } = useLang();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleActivate = () => {
    if (!code.trim()) return;

    const codes = JSON.parse(localStorage.getItem("skyface_codes") || "[]") as {
      code: string;
      status: string;
    }[];

    const found = codes.find((c) => c.code === code.trim() && c.status === "active");
    if (found) {
      found.status = "used";
      localStorage.setItem("skyface_codes", JSON.stringify(codes));
      const users = parseInt(localStorage.getItem("skyface_users") || "0") + 1;
      localStorage.setItem("skyface_users", users.toString());
      onCodeActivated(code);
      setMessage({ text: t.codeActivated, type: "success" });
      setCode("");
    } else {
      setMessage({ text: t.invalidCode, type: "error" });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  const whatsappUrl = `https://wa.me/9647703841572?text=${encodeURIComponent(
    lang === "ar" ? t.whatsappMessage : t.whatsappMessage
  )}`;

  const plans = [
    {
      name: t.freePlan,
      price: t.freePlanPrice,
      features: t.freePlanFeatures,
      icon: <Star size={28} className="text-gray-400" />,
      highlight: false,
      border: "border-white/10",
    },
    {
      name: t.proPlan,
      price: t.proPlanPrice,
      features: t.proPlanFeatures,
      icon: <Zap size={28} className="text-cyan-400" />,
      highlight: true,
      border: "border-cyan-500/50",
    },
    {
      name: t.premiumPlan,
      price: t.premiumPlanPrice,
      features: t.premiumPlanFeatures,
      icon: <Crown size={28} className="text-yellow-400" />,
      highlight: false,
      border: "border-yellow-500/30",
    },
  ];

  return (
    <section className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
          {t.subscriptionTitle}
        </h2>
        <p className="text-gray-400 text-center mb-10">{t.subscriptionSubtitle}</p>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white/5 backdrop-blur-sm border ${plan.border} rounded-2xl p-6
                transition-all duration-300 hover:scale-105 ${
                  plan.highlight
                    ? "shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/20"
                    : ""
                }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {plan.icon}
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              </div>
              <p className="text-2xl font-black text-cyan-400 mb-6">{plan.price}</p>
              <ul className="space-y-3">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check size={16} className="text-cyan-400 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Code Entry */}
        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">{t.enterCode}</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t.codePlaceholder}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white
                placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              onKeyDown={(e) => e.key === "Enter" && handleActivate()}
            />
            <button
              onClick={handleActivate}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold
                rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 active:scale-95"
            >
              {t.activate}
            </button>
          </div>
          {message && (
            <p
              className={`mt-3 text-sm font-medium ${
                message.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>

        {/* Contact Sales */}
        <div className="text-center mt-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500
              text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MessageCircle size={20} />
            {t.contactSales}
          </a>
        </div>
      </div>
    </section>
  );
}
