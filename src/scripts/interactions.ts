const toggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const nav = document.querySelector<HTMLElement>("#mobile-nav");
const closeMenu = () => {
  if (!toggle || !nav) return;
  toggle.setAttribute("aria-expanded", "false");
  nav.hidden = true;
};
toggle?.addEventListener("click", () => {
  if (!nav) return;
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.hidden = open;
});
nav
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    toggle?.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (
    event.target instanceof Node &&
    !document.querySelector(".header")?.contains(event.target)
  )
    closeMenu();
});
const desktop = window.matchMedia("(min-width: 1024px)");
desktop.addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!motion.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("reveal-pending");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
    // Conteúdo na primeira dobra não espera pelo observer.
    if (element.getBoundingClientRect().top > window.innerHeight)
      element.classList.add("reveal-pending");
    observer.observe(element);
  });
  motion.addEventListener("change", (event) => {
    if (event.matches) {
      observer.disconnect();
      document
        .querySelectorAll(".reveal-pending")
        .forEach((element) => element.classList.remove("reveal-pending"));
    }
  });
}

const dialog = document.querySelector<HTMLDialogElement>("#photo-dialog");
const dialogImage = document.querySelector<HTMLImageElement>("#dialog-image");
const dialogTitle = document.querySelector<HTMLElement>("#photo-dialog-title");
document
  .querySelectorAll<HTMLButtonElement>("[data-lightbox]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      const caption = button.closest("figure")?.querySelector("figcaption")
        ?.firstChild?.textContent;
      if (!dialog || !dialogImage || !dialogTitle || !image) return;
      dialogImage.src = button.dataset.full || image.currentSrc || image.src;
      dialogImage.alt = image.alt;
      dialogTitle.textContent = caption || "Imagem demonstrativa";
      dialog.showModal();
    });
  });
dialog
  ?.querySelector(".dialog-close")
  ?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
    dialog.close();
});
