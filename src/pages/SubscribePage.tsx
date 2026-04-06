import { useState, useEffect } from 'react';
import { Crown, Check, MessageCircle, KeyRound, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SubscribePage() {
  const { t, lang } = useLanguage();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setIsSubscribed(localStorage.getItem('skyface_subscribed') === 'true');
  }, []);

  const handleActivate = () => {
    if (isSubscribed) {
      setMessage(t.alreadySubscribed);
      setMessageType('success');
      return;
    }

    const validCodes = JSON.parse(localStorage.getItem('skyface_codes') || '[]') as string[];
    if (validCodes.includes(code.trim())) {
      localStorage.setItem('skyface_subscribed', 'true');
      setIsSubscribed(true);
      setMessage(t.codeActivated);
      setMessageType('success');
      // Remove used code
      const updatedCodes = validCodes.filter(c => c !== code.trim());
      localStorage.setItem('skyface_codes', JSON.stringify(updatedCodes));
      setCode('');
    } else {
      setMessage(t.invalidCode);
      setMessageType('error');
    }
  };

  const whatsappUrl = `https://wa.me/9647774789781?text=${encodeURIComponent(
    lang === 'ar' ? t.whatsappMessage : t.whatsappMessage
  )}`;

  const features = [
    t.premiumFeature1,
    t.premiumFeature2,
    t.premiumFeature3,
    t.premiumFeature4,
  ];

  if (isSubscribed) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyber-lime to-green-400 flex items-center justify-center mb-6">
          <Check size={40} className="text-deep-charcoal" />
        </div>
        <h2 className="text-2xl font-bold text-cyber-lime mb-3">{t.alreadySubscribed}</h2>
        <p className="text-gray-400">{t.premiumFeature1}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-8">
      {/* Premium Hero */}
      <div className="relative overflow-hidden rounded-3xl mb-8 p-8 border border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-amber-500/5">
        <div className="absolute top-4 right-4">
          <Sparkles className="text-yellow-500" size={24} />
        </div>
        <div className="text-center">
          <Crown size={48} className="text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">{t.premiumTitle}</h2>
          <p className="text-gray-300 text-lg">{t.premiumSubtitle}</p>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-2xl glass border border-white/5 animate-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
              <Check size={16} className="text-neon-blue" />
            </div>
            <span className="text-gray-200">{feature}</span>
          </div>
        ))}
      </div>

      {/* WhatsApp CTA */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-4 rounded-2xl font-bold text-lg text-center transition-all duration-300
          bg-gradient-to-r from-green-500 to-green-600 text-white
          hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] active:scale-95 mb-6"
      >
        <div className="flex items-center justify-center gap-3">
          <MessageCircle size={24} />
          <span>{t.contactSales}</span>
        </div>
      </a>

      {/* Code Entry */}
      <div className="glass rounded-3xl p-6 border border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <KeyRound size={20} className="text-neon-blue" />
          <h3 className="text-lg font-semibold">{t.enterCode}</h3>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder={t.enterCodePlaceholder}
            maxLength={6}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center
              text-lg font-mono tracking-widest focus:outline-none focus:border-neon-blue/50
              transition-colors placeholder:text-gray-600"
            dir="ltr"
          />
          <button
            onClick={handleActivate}
            className="px-6 py-3 rounded-xl bg-neon-blue text-deep-charcoal font-bold
              hover:bg-neon-blue/80 transition-all duration-300 active:scale-95"
          >
            {t.activateCode}
          </button>
        </div>
        {message && (
          <p className={`mt-3 text-sm text-center animate-fade-in
            ${messageType === 'success' ? 'text-cyber-lime' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
