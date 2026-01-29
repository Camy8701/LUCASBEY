import { createRoot } from "react-dom/client"
import { HeroSection } from "@/components/ui/hero-section-with-smooth-bg-shader"

const rootEl = document.getElementById("bg-root")

if (rootEl) {
  const saveData = (navigator as { connection?: { saveData?: boolean } }).connection?.saveData

  rootEl.classList.add("fixed", "inset-0", "z-0", "pointer-events-none")
  rootEl.setAttribute("aria-hidden", "true")
  rootEl.style.background = "transparent"

  if (!saveData) {
    createRoot(rootEl).render(
      <HeroSection
        title=""
        highlightText=""
        description=""
        buttonText=""
        className="min-h-0 h-full pointer-events-none !bg-transparent"
        titleClassName="hidden"
        descriptionClassName="hidden"
        buttonClassName="hidden"
        maxWidth="max-w-none"
        veilOpacity="bg-white/0"
        distortion={1.2}
        speed={0.8}
      />
    )
  }
}
