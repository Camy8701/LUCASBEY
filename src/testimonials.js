document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-testimonial-row]").forEach((row) => {
    if (row.dataset.duplicated === "true") return

    const cards = Array.from(row.children).filter(
      (child) => child.nodeType === 1
    )
    if (!cards.length) return

    cards.forEach((card) => {
      const clone = card.cloneNode(true)
      clone.setAttribute("aria-hidden", "true")
      row.appendChild(clone)
    })

    row.dataset.duplicated = "true"
  })
})
