(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile menu
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".burger");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("nav a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", false);
    }),
  );

  // 3D cube: auto-rotates, follows cursor / touch
  const cube = document.querySelector(".cube");
  const scene = document.querySelector(".scene");
  if (!reduce) cube.classList.add("auto");

  const follow = (x, y) => {
    const r = scene.getBoundingClientRect();
    const px = (x - r.left) / r.width - 0.5;
    const py = (y - r.top) / r.height - 0.5;
    cube.classList.remove("auto");
    cube.style.setProperty("--ry", `${px * 160 + 30}deg`);
    cube.style.setProperty("--rx", `${-py * 120 - 20}deg`);
  };
  if (!reduce) {
    scene.addEventListener("pointermove", (e) => follow(e.clientX, e.clientY));
    scene.addEventListener("pointerleave", () => {
      cube.style.removeProperty("--rx");
      cube.style.removeProperty("--ry");
      cube.classList.add("auto");
    });
  }

  // 3D tilt cards (mouse devices only)
  if (fine && !reduce) {
    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
      });
      card.addEventListener("pointerleave", () => (card.style.transform = ""));
    });
  }
})();
