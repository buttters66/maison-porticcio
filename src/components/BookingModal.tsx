import { X, Users, Info, Calendar, CheckCircle, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dates déjà réservées (format: "YYYY-MM-DD")
// MODIFIEZ ICI pour ajouter vos réservations
// Exemple : { start: "2025-07-12", end: "2025-07-19", status: "confirmed" }
const RESERVED_DATES: { start: string; end: string; status: string }[] = [
  // Ajoutez vos réservations ici quand vous en aurez
];

// Vérifier si une date est réservée
const isDateReserved = (date: Date): { reserved: boolean; status?: string } => {
  for (const reservation of RESERVED_DATES) {
    const start = new Date(reservation.start);
    const end = new Date(reservation.end);
    if (date >= start && date < end) {
      return { reserved: true, status: reservation.status };
    }
  }
  return { reserved: false };
};

// Vérifier si c'est un samedi
const isSaturday = (date: Date): boolean => {
  return date.getDay() === 6;
};

// Prix par période (basé sur la date de début du séjour)
const getPriceForDate = (date: Date): { price: number; label: string } => {
  const month = date.getMonth(); // 0-11
  const day = date.getDate();

  // Mars (mois 2)
  if (month === 2) {
    if (day < 16) {
      return { price: 800, label: "Début de saison" };
    }
    return { price: 900, label: "Moyenne saison" };
  }
  
  // Avril, Mai, Juin (mois 3, 4, 5)
  if (month >= 3 && month <= 5) {
    return { price: 900, label: "Moyenne saison" };
  }
  
  // Juillet (mois 6)
  if (month === 6) {
    return { price: 1200, label: "Haute saison" };
  }
  
  // Août (mois 7)
  if (month === 7) {
    // Dernière semaine d'août (après le 24)
    if (day >= 24) {
      return { price: 1000, label: "Fin août" };
    }
    return { price: 1300, label: "Très haute saison" };
  }
  
  // Septembre, Octobre (mois 8, 9)
  if (month === 8 || (month === 9 && day <= 15)) {
    return { price: 900, label: "Arrière-saison" };
  }
  
  return { price: 900, label: "Saison" };
};

// Calculer le nombre de semaines entre deux dates
const getWeeksBetween = (start: Date, end: Date): number => {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.round(diffDays / 7);
};

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(4); // Avril par défaut
  const [calendarYear, setCalendarYear] = useState(2026);
  const [selectedArrival, setSelectedArrival] = useState<Date | null>(null);
  const [selectedDeparture, setSelectedDeparture] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedArrival || !selectedDeparture) {
      setError("Veuillez sélectionner vos dates d'arrivée et de départ.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Ajouter les dates sélectionnées
    formData.set("arrival", selectedArrival.toLocaleDateString('fr-FR'));
    formData.set("departure", selectedDeparture.toLocaleDateString('fr-FR'));
    formData.set("guests", guests.toString());
    formData.set("total", `${calculateTotal()}€`);

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
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          setSelectedArrival(null);
          setSelectedDeparture(null);
        }, 3000);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculer le prix total
  const calculateTotal = (): number => {
    if (!selectedArrival || !selectedDeparture) return 0;
    
    const weeks = getWeeksBetween(selectedArrival, selectedDeparture);
    let total = 0;
    
    // Calculer le prix pour chaque semaine
    const currentDate = new Date(selectedArrival);
    for (let i = 0; i < weeks; i++) {
      const { price } = getPriceForDate(currentDate);
      total += price;
      currentDate.setDate(currentDate.getDate() + 7);
    }
    
    // Ajouter les frais de ménage
    total += 120;
    
    return total;
  };

  // Cliquer sur une date
  const handleDateClick = (date: Date) => {
    const { reserved } = isDateReserved(date);
    if (reserved || !isSaturday(date)) return;

    if (!selectedArrival || (selectedArrival && selectedDeparture)) {
      // Sélectionner la date d'arrivée
      setSelectedArrival(date);
      setSelectedDeparture(null);
    } else {
      // Sélectionner la date de départ
      if (date > selectedArrival) {
        setSelectedDeparture(date);
      } else {
        setSelectedArrival(date);
        setSelectedDeparture(null);
      }
    }
  };

  // Vérifier si une date est dans la sélection
  const isInSelection = (date: Date): boolean => {
    if (!selectedArrival) return false;
    if (!selectedDeparture) return date.getTime() === selectedArrival.getTime();
    return date >= selectedArrival && date <= selectedDeparture;
  };

  // Générer le calendrier pour un mois
  const generateCalendar = (month: number, year: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];
    
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const { reserved, status } = isDateReserved(date);
      const saturday = isSaturday(date);
      const inSelection = isInSelection(date);
      const isArrival = selectedArrival && date.getTime() === selectedArrival.getTime();
      const isDeparture = selectedDeparture && date.getTime() === selectedDeparture.getTime();
      
      days.push({ day, date, reserved, status, saturday, inSelection, isArrival, isDeparture });
    }

    return days;
  };

  const monthNames = ["", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const prevMonth = () => {
    if (calendarMonth === 1) {
      setCalendarMonth(12);
      setCalendarYear(y => y - 1);
    } else {
      setCalendarMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (calendarMonth === 12) {
      setCalendarMonth(1);
      setCalendarYear(y => y + 1);
    } else {
      setCalendarMonth(m => m + 1);
    }
  };

  const weeks = selectedArrival && selectedDeparture ? getWeeksBetween(selectedArrival, selectedDeparture) : 0;
  const total = calculateTotal();
  const deposit = Math.round(total * 0.3);

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden w-full max-h-[95vh] flex flex-col">
              {/* Header */}
              <div className="relative p-4 md:p-6 border-b border-white/10 shrink-0">
                <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase">
                  Réserver votre séjour
                </h2>
                <p className="text-xs md:text-sm opacity-60 mt-1">
                  Sélectionnez vos samedis d'arrivée et de départ
                </p>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Demande envoyée !</h3>
                    <p className="text-white/60">Nous vous contacterons dans les 24h pour confirmer.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <input type="hidden" name="_subject" value="Nouvelle demande de réservation - Maison Porticcio" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                      {/* Calendrier - 2 colonnes */}
                      <div className="lg:col-span-2 space-y-4">
                        {/* Navigation du calendrier */}
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-4 border border-white/10">
                          <div className="flex items-center justify-between mb-4">
                            <button
                              type="button"
                              onClick={prevMonth}
                              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="text-center">
                              <span className="text-lg md:text-xl font-bold">{monthNames[calendarMonth]} {calendarYear}</span>
                            </div>
                            <button
                              type="button"
                              onClick={nextMonth}
                              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Légende */}
                          <div className="flex flex-wrap gap-3 mb-4 text-xs justify-center">
                            <span className="flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded bg-[#FF6B35]"></span> Réservé
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded bg-yellow-500"></span> En attente
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded bg-green-500"></span> Sélectionné
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-4 h-4 rounded border-2 border-white/40"></span> Samedi dispo
                            </span>
                          </div>

                          {/* Jours de la semaine */}
                          <div className="grid grid-cols-7 gap-0.5 mb-1">
                            {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => (
                              <div key={day} className="text-center text-[10px] opacity-50 py-1 font-semibold">
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Calendrier */}
                          <div className="grid grid-cols-7 gap-0.5">
                            {generateCalendar(calendarMonth, calendarYear).map((dayInfo, idx) => (
                              <button
                                key={idx}
                                type="button"
                                disabled={dayInfo === null || dayInfo.reserved || !dayInfo.saturday}
                                onClick={() => dayInfo && handleDateClick(dayInfo.date)}
                                className={`
                                  h-8 w-full flex items-center justify-center rounded text-xs font-medium transition-all
                                  ${dayInfo === null ? 'invisible' : ''}
                                  ${dayInfo?.reserved 
                                    ? dayInfo.status === 'pending'
                                      ? 'bg-yellow-500 text-black cursor-not-allowed'
                                      : 'bg-[#FF6B35] text-white cursor-not-allowed'
                                    : dayInfo?.inSelection
                                      ? 'bg-green-500 text-white'
                                      : dayInfo?.saturday
                                        ? 'border border-white/40 hover:border-green-500 hover:bg-green-500/20 cursor-pointer'
                                        : 'bg-white/5 text-white/30 cursor-not-allowed'
                                  }
                                  ${dayInfo?.isArrival || dayInfo?.isDeparture ? 'ring-2 ring-white' : ''}
                                `}
                              >
                                {dayInfo?.day || ''}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Grille tarifaire */}
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-4 border border-white/10">
                          <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                            <Info className="w-4 h-4 text-[#FF6B35]" />
                            Tarifs par semaine (samedi au samedi)
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                            <div className="bg-white/5 rounded-lg p-2">
                              <p className="opacity-60">1er - 16 mars</p>
                              <p className="font-bold text-[#FF6B35]">800€</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2">
                              <p className="opacity-60">16 mars - fin juin</p>
                              <p className="font-bold text-[#FF6B35]">900€</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2">
                              <p className="opacity-60">Juillet</p>
                              <p className="font-bold text-[#FF6B35]">1 200€</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2">
                              <p className="opacity-60">Août (sauf dernière sem.)</p>
                              <p className="font-bold text-[#FF6B35]">1 300€</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2">
                              <p className="opacity-60">Dernière sem. août</p>
                              <p className="font-bold text-[#FF6B35]">1 000€</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2">
                              <p className="opacity-60">Sept - 15 oct</p>
                              <p className="font-bold text-[#FF6B35]">900€</p>
                            </div>
                          </div>
                          <p className="text-xs opacity-50 mt-2">+ Ménage : 120€ • Acompte : 30%</p>
                        </div>
                      </div>

                      {/* Formulaire - 1 colonne */}
                      <div className="space-y-4">
                        {/* Récapitulatif sélection */}
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-4 border border-white/10">
                          <h4 className="font-bold text-sm mb-3">Votre sélection</h4>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="opacity-60">Arrivée</span>
                              <span className="font-semibold">
                                {selectedArrival ? selectedArrival.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }) : '—'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="opacity-60">Départ</span>
                              <span className="font-semibold">
                                {selectedDeparture ? selectedDeparture.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }) : '—'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="opacity-60">Durée</span>
                              <span className="font-semibold">{weeks > 0 ? `${weeks} semaine${weeks > 1 ? 's' : ''}` : '—'}</span>
                            </div>
                          </div>

                          {total > 0 && (
                            <div className="mt-3 pt-3 border-t border-white/10">
                              <div className="flex justify-between text-sm">
                                <span className="opacity-60">Séjour</span>
                                <span>{total - 120}€</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="opacity-60">Ménage</span>
                                <span>120€</span>
                              </div>
                              <div className="flex justify-between font-bold text-lg mt-2">
                                <span>Total</span>
                                <span className="text-[#FF6B35]">{total}€</span>
                              </div>
                              <p className="text-xs opacity-50 mt-1">Acompte (30%) : {deposit}€</p>
                            </div>
                          )}
                        </div>

                        {/* Nombre de personnes */}
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-4 border border-white/10">
                          <label className="block text-xs uppercase opacity-60 mb-2 font-semibold">
                            <Users className="w-3 h-3 inline mr-1" />
                            Personnes
                          </label>
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => setGuests(g => Math.max(1, g - 1))}
                              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold"
                            >
                              −
                            </button>
                            <span className="text-xl font-bold">{guests}</span>
                            <button
                              type="button"
                              onClick={() => setGuests(g => Math.min(5, g + 1))}
                              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-xs opacity-50 text-center mt-1">Max. 5 personnes</p>
                        </div>

                        {/* Coordonnées */}
                        <div className="space-y-3">
                          <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#FF6B35] focus:outline-none transition-colors text-sm"
                            placeholder="Nom complet"
                          />
                          <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#FF6B35] focus:outline-none transition-colors text-sm"
                            placeholder="Email"
                          />
                          <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#FF6B35] focus:outline-none transition-colors text-sm"
                            placeholder="Téléphone"
                          />
                          <textarea
                            name="message"
                            rows={2}
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-[#FF6B35] focus:outline-none transition-colors resize-none text-sm"
                            placeholder="Message (optionnel)"
                          />
                        </div>

                        {error && (
                          <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting || !selectedArrival || !selectedDeparture}
                          className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] hover:from-[#FF8E53] hover:to-[#FFB03B] text-white px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-5 h-5" />
                          {isSubmitting ? "Envoi..." : "Envoyer ma demande"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
