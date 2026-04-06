import { useState, useEffect, useCallback } from "react";
import { useLang } from "../i18n/LanguageContext";
import { Users, KeyRound, TicketCheck, Copy, Trash2, LogOut, Plus } from "lucide-react";

interface Code {
  code: string;
  status: "active" | "used";
  createdAt: string;
}

interface AdminPanelProps {
  onLogout: () => void;
}

function generateRandomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "SKY-";
  for (let i = 0; i < 3; i++) {
    if (i > 0) result += "-";
    for (let j = 0; j < 4; j++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  return result;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const { t } = useLang();
  const [codes, setCodes] = useState<Code[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const loadData = useCallback(() => {
    const stored = JSON.parse(localStorage.getItem("skyface_codes") || "[]") as Code[];
    setCodes(stored);
    setTotalUsers(parseInt(localStorage.getItem("skyface_users") || "0"));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleGenerate = () => {
    const newCode: Code = {
      code: generateRandomCode(),
      status: "active",
      createdAt: new Date().toISOString(),
    };
    const updated = [...codes, newCode];
    setCodes(updated);
    localStorage.setItem("skyface_codes", JSON.stringify(updated));
  };

  const handleDelete = (codeStr: string) => {
    const updated = codes.filter((c) => c.code !== codeStr);
    setCodes(updated);
    localStorage.setItem("skyface_codes", JSON.stringify(updated));
  };

  const handleCopy = async (codeStr: string) => {
    await navigator.clipboard.writeText(codeStr);
    setCopiedCode(codeStr);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const activeCodes = codes.filter((c) => c.status === "active").length;

  return (
    <section className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {t.adminPanel}
          </h2>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400
              rounded-xl hover:bg-red-500/30 transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            {t.logout}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-cyan-400" />
              <span className="text-gray-400 text-sm">{t.totalUsers}</span>
            </div>
            <p className="text-3xl font-black text-white">{totalUsers}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <TicketCheck size={20} className="text-green-400" />
              <span className="text-gray-400 text-sm">{t.activeSubscriptions}</span>
            </div>
            <p className="text-3xl font-black text-white">{activeCodes}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <KeyRound size={20} className="text-purple-400" />
              <span className="text-gray-400 text-sm">{t.generatedCodes}</span>
            </div>
            <p className="text-3xl font-black text-white">{codes.length}</p>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3
            bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl
            hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 mb-6
            active:scale-95"
        >
          <Plus size={18} />
          {t.generateCode}
        </button>

        {/* Code List */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <h3 className="text-lg font-bold text-white">{t.codeList}</h3>
          </div>

          {codes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {t.generatedCodes}: 0
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {codes.map((item) => (
                <div
                  key={item.code}
                  className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <code className="text-white font-mono text-sm bg-white/5 px-3 py-1 rounded-lg">
                      {item.code}
                    </code>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        item.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {item.status === "active" ? t.active : t.used}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item.code)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white/5 text-gray-300
                        rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Copy size={12} />
                      {copiedCode === item.code ? t.copied : t.copyCode}
                    </button>
                    <button
                      onClick={() => handleDelete(item.code)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-500/10 text-red-400
                        rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={12} />
                      {t.deleteCode}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
