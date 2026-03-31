# Maison Porticcio - Site de Location

Site web moderne pour la location de vacances à Porticcio, Corse du Sud.

## 🏠 Caractéristiques

- **Design moderne** : Interface sombre et élégante avec animations fluides
- **Responsive** : Optimisé pour mobile, tablette et desktop
- **Galerie interactive** : Lightbox pour visualiser les photos en grand
- **Système de réservation** : Modal de réservation avec estimation de prix
- **Formulaire de contact** : Modal de contact intégré
- **Localisation** : Carte Google Maps intégrée

## 🛠️ Technologies

- **React 18** avec TypeScript
- **Vite** pour le bundling
- **Tailwind CSS** pour le styling
- **Motion (Framer Motion)** pour les animations
- **Lucide React** pour les icônes

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build
```

## 📁 Structure du projet

```
├── public/
│   ├── img/                    # Images de la villa
│   │   ├── Pub Porticcio MArs 2025/  # Photos principales
│   │   └── beaches/            # Photos des plages
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── App.tsx            # Composant principal
│   │   ├── HeroSection.tsx    # Section héro avec carousel
│   │   ├── MarqueeSection.tsx # Bandeau défilant
│   │   ├── BentoFeatures.tsx  # Section équipements
│   │   ├── GallerySection.tsx # Galerie photos
│   │   ├── LocationSection.tsx # Section localisation
│   │   ├── BookingModal.tsx   # Modal de réservation
│   │   ├── ContactModal.tsx   # Modal de contact
│   │   ├── FloatingCTA.tsx    # Boutons flottants
│   │   └── Footer.tsx         # Pied de page
│   ├── main.tsx
│   └── index.css
└── index.html
```

## 📍 Informations de la villa

- **Adresse** : 13 Allée des Hirondelles, 20166 Porticcio
- **Capacité** : 5 personnes
- **Chambres** : 2
- **Distance plage** : 5 minutes à pied
- **Vue** : Golfe d'Ajaccio

## 💰 Tarifs

- **Basse saison** (Mars-Juin, Sept-Oct) : 900€/semaine
- **Moyenne saison** (Juillet) : 1100€/semaine
- **Haute saison** (Août) : 1300€/semaine
- **Frais de ménage** : 80€
