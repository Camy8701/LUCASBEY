import { createRoot } from "react-dom/client"
import { CardStack, type CardStackItem } from "./components/ui/card-stack"

const frItems: CardStackItem[] = [
  {
    id: 1,
    title: "Ostéopathie Fonctionnelle",
    description:
      "Analyse du mouvement et des déséquilibres pour restaurer l'harmonie du corps au quotidien.",
    imageSrc:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    href: "services.html",
  },
  {
    id: 2,
    title: "Ostéopathie Viscérale",
    description:
      "Approche douce des tissus viscéraux pour soutenir le confort abdominal et la respiration.",
    imageSrc:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop",
    href: "services.html",
  },
  {
    id: 3,
    title: "Ostéopathie Structurelle",
    description:
      "Travail des articulations, muscles et posture pour relâcher les tensions et améliorer la mobilité.",
    imageSrc:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop",
    href: "services.html",
  },
  {
    id: 4,
    title: "Ostéopathie Crânienne",
    description:
      "Gestes précis et délicats pour favoriser la détente, l'équilibre et le confort global.",
    imageSrc:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    href: "services.html",
  },
]

const enItems: CardStackItem[] = [
  {
    id: 1,
    title: "Functional Osteopathy",
    description:
      "Movement analysis and balance work to restore daily comfort and harmony.",
    imageSrc:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    href: "services.html",
  },
  {
    id: 2,
    title: "Visceral Osteopathy",
    description:
      "Gentle work on visceral tissues to support abdominal comfort and breathing.",
    imageSrc:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop",
    href: "services.html",
  },
  {
    id: 3,
    title: "Structural Osteopathy",
    description:
      "Joint, muscle, and posture work to release tension and improve mobility.",
    imageSrc:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop",
    href: "services.html",
  },
  {
    id: 4,
    title: "Cranial Osteopathy",
    description:
      "Precise, light techniques to encourage relaxation and overall balance.",
    imageSrc:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    href: "services.html",
  },
]

const deItems: CardStackItem[] = [
  {
    id: 1,
    title: "Funktionelle Osteopathie",
    description:
      "Bewegungsanalyse und Balancearbeit für mehr Harmonie im Alltag.",
    imageSrc:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    href: "leistungen.html",
  },
  {
    id: 2,
    title: "Viszerale Osteopathie",
    description:
      "Sanfte Behandlung der Viszera zur Unterstützung von Bauch und Atmung.",
    imageSrc:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop",
    href: "leistungen.html",
  },
  {
    id: 3,
    title: "Strukturelle Osteopathie",
    description:
      "Arbeit an Gelenken, Muskeln und Haltung zur Verbesserung der Mobilität.",
    imageSrc:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop",
    href: "leistungen.html",
  },
  {
    id: 4,
    title: "Kraniale Osteopathie",
    description:
      "Präzise, sanfte Techniken für Entspannung und ganzheitliches Gleichgewicht.",
    imageSrc:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    href: "leistungen.html",
  },
]

const localeItems: Record<string, CardStackItem[]> = {
  fr: frItems,
  en: enItems,
  de: deItems,
}

const mount = document.getElementById("expertise-stack")

if (mount) {
  const locale = mount.getAttribute("data-locale") || "fr"
  const items = localeItems[locale] ?? frItems
  createRoot(mount).render(
    <CardStack
      items={items}
      initialIndex={0}
      autoAdvance
      intervalMs={2000}
      pauseOnHover
      showDots
    />
  )
}
