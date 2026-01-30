import { MapPin, Mail, Phone } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-16 px-4 md:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 
              className="text-2xl md:text-3xl tracking-tighter uppercase mb-4"
              style={{ fontWeight: 900 }}
            >
              Maison
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FF8E53]"> Porticcio</span>
            </h3>
            <p className="text-white/60 leading-relaxed">
              {t("footerDesc")}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg uppercase tracking-wider mb-4" style={{ fontWeight: 800 }}>{t("contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/60">
                <MapPin className="w-4 h-4 text-[#FF6B35]" />
                <span>13 Allée des Hirondelles, 20166 Porticcio</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Mail className="w-4 h-4 text-[#FF6B35]" />
                <a href="mailto:casa.abid@gmail.com" className="hover:text-white transition-colors">
                  casa.abid@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Phone className="w-4 h-4 text-[#FF6B35]" />
                <a href="tel:+33686949778" className="hover:text-white transition-colors">
                  +33 6 86 94 97 78
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg uppercase tracking-wider mb-4" style={{ fontWeight: 800 }}>{t("practicalInfo")}</h4>
            <ul className="space-y-2 text-white/60">
              <li>• {t("arrivalTime")}</li>
              <li>• {t("departureTime")}</li>
              <li>• {t("satToSat")}</li>
              <li>• {t("noPets")}</li>
              <li>• {t("noSmoking")}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Maison Porticcio. {t("allRights")}
          </p>
          <p className="text-white/40 text-sm">
            Corse du Sud • France
          </p>
        </div>
      </div>
    </footer>
  );
}
