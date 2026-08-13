let showCarats = new IntersectionObserver(
  (items, kimo) => {
    items.forEach((imem) => {
      if (imem.isIntersecting) {
        imem.target.classList.add("show-hidde");
        kimo.unobserve(imem.target);
      }
    });
  },
  {
    threshold: 0.3,
  },
);

let carats = document.querySelectorAll(".hidde");

carats.forEach((card) => {
  showCarats.observe(card);
});
