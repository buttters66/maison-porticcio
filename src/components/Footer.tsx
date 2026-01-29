import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
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
              Une maison d'exception avec vue imprenable sur le golfe d'Ajaccio. Votre havre de paix en Corse du Sud.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg uppercase tracking-wider mb-4" style={{ fontWeight: 800 }}>Contact</h4>
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
                <a href="tel:+33600000000" className="hover:text-white transition-colors">
                  +33 6 XX XX XX XX
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg uppercase tracking-wider mb-4" style={{ fontWeight: 800 }}>Infos pratiques</h4>
            <ul className="space-y-2 text-white/60">
              <li>• Arrivée à partir de 16h</li>
              <li>• Départ avant 10h</li>
              <li>• Location samedi à samedi</li>
              <li>• Animaux non acceptés</li>
              <li>• Non fumeur</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Maison Porticcio. Tous droits réservés.
          </p>
          <p className="text-white/40 text-sm">
            Corse du Sud • France
          </p>
        </div>
      </div>
    </footer>
  );
}
