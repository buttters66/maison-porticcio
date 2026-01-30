import { X, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xrekqpdv", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        setError(t("errorGeneric"));
      }
    } catch {
      setError(t("errorConnection"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl z-50"
          >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden h-full flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="relative p-6 border-b border-white/10">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
                  {t("contactTitle")}
                </h2>
                <p className="text-sm opacity-60 mt-2">
                  {t("contactSubtitle")}
                </p>
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t("messageSent")}</h3>
                    <p className="text-white/60">{t("messageSuccess")}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-5 border border-white/5">
                        <div className="bg-[#FF6B35]/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                          <Mail className="w-5 h-5 text-[#FF6B35]" />
                        </div>
                        <p className="text-xs uppercase opacity-60 mb-1">{t("email")}</p>
                        <p className="font-bold">casa.abid@gmail.com</p>
                      </div>

                      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-5 border border-white/5">
                        <div className="bg-[#4A9FFF]/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                          <Phone className="w-5 h-5 text-[#4A9FFF]" />
                        </div>
                        <p className="text-xs uppercase opacity-60 mb-1">{t("phone")}</p>
                        <a href="tel:+33686949778" className="font-bold hover:text-[#4A9FFF] transition-colors">
                          +33 6 86 94 97 78
                        </a>
                      </div>

                      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-5 border border-white/5">
                        <div className="bg-[#50C878]/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                          <MapPin className="w-5 h-5 text-[#50C878]" />
                        </div>
                        <p className="text-xs uppercase opacity-60 mb-1">{t("address")}</p>
                        <p className="font-bold">
                          13 Allée des Hirondelles<br />
                          20166 Porticcio
                        </p>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="hidden" name="_subject" value="Nouveau message - Maison Porticcio" />
                      
                      <div>
                        <label className="block text-xs uppercase opacity-60 mb-2 font-semibold">
                          {t("fullName")}
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#FF6B35] focus:outline-none transition-colors"
                          placeholder="Jean Dupont"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase opacity-60 mb-2 font-semibold">
                          {t("email")}
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#FF6B35] focus:outline-none transition-colors"
                          placeholder="jean@exemple.fr"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase opacity-60 mb-2 font-semibold">
                          {t("phone")}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#FF6B35] focus:outline-none transition-colors"
                          placeholder="+33 6 86 94 97 78"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase opacity-60 mb-2 font-semibold">
                          {t("yourMessage")}
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#FF6B35] focus:outline-none transition-colors resize-none"
                          placeholder={t("messagePlaceholder")}
                        />
                      </div>

                      {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] hover:from-[#FF8E53] hover:to-[#FFB03B] text-white px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                        {isSubmitting ? t("sending") : t("sendMessage")}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
