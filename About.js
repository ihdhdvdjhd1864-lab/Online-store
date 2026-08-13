showCarats = new IntersectionObserver(
    (itmes, kimo) => {
        itmes.forEach((item) => {
            if (item.isIntersecting) {
                item.target.classList.add("show-hidde");
                kimo.unobserve(item.target);
            }
        });
    },
    {
        threshold: 0.3,
    },
)
let carats = document.querySelectorAll(".hidde");
carats.forEach((card) => {
    showCarats.observe(card);
})
