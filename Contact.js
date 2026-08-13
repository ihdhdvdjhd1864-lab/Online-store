const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

    formMessage.textContent = "Your message has been sent successfully!";
setTimeout(() => {
  formMessage.textContent = "";
}, 2000);

  contactForm.reset();
});

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
