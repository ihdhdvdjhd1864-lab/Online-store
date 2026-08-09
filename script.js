//  محتوي شغل كلووووووووووو
let cuet = document.querySelector("#cuet");
let count = JSON.parse(localStorage.getItem("count")) || 0;

function addCount() {
  count++;
  cuet.textContent = count;
  localStorage.setItem("count", count);
}
window.addEventListener("DOMContentLoaded", () => {
  cuet.textContent = count;
});

//  ليل و نهار
let modal = document.querySelector(".modal");

let bodyy = document.body;
modal.addEventListener("click", () => {
  bodyy.classList.toggle("show");
  if (bodyy.classList.contains("show")) {
    localStorage.setItem("modal", "link");
    modal.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    localStorage.setItem("modal", "dark");
    modal.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
});
window.addEventListener("DOMContentLoaded", () => {
  let getModal = localStorage.getItem("modal");
  if (getModal === "link") {
    bodyy.classList.add("show");
    modal.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    modal.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
});
// يطلع  فوق ب سللسه كد
let butAntlk = document.querySelector(".Antlk");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    butAntlk.classList.add("AntlkShow");
  } else {
    butAntlk.classList.remove("AntlkShow");
  }
});
butAntlk.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// زاار جانب مينو
let butMenu = document.querySelector(".menu-btn");
let linksnav = document.querySelector(".links-nav");
let overlay = document.querySelector(".overlay");

let bars = document.querySelector("#bars");
butMenu.addEventListener("click", () => {
  linksnav.classList.toggle("links-nav-active");
  if (linksnav.classList.contains("links-nav-active")) {
    bars.classList.remove("fa-bars");
    bars.classList.add("fa-xmark");
    overlay.classList.add("overlay-active");
  } else {
    bars.classList.remove("fa-xmark");
    bars.classList.add("fa-bars");
    overlay.classList.remove("overlay-active");
  }
});
overlay.addEventListener("click", () => {
  linksnav.classList.remove("links-nav-active");
  bars.classList.remove("fa-xmark");
  bars.classList.add("fa-bars");
  overlay.classList.remove("overlay-active");
});
// شغل الحقيقي
let cards = document.querySelector(".cards");

async function getFetch() {
  let response = await fetch("dade.json");
  let data = await response.json();
  cards.innerHTML = data
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-img-container">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-bottom">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-cart-btn" onclick="addCount()">+ Add</button>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}
getFetch();
