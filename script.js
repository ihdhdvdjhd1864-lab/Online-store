// loader
let loader = document.querySelector("#loader");
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 3000);
})


//  محتوي شغل كلووووووووووو
let cuet = document.querySelector("#cuet");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
let data = [];
let showCarats = new IntersectionObserver(
  (itmes, kimo) => {
    itmes.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add("hidden-active");
        kimo.unobserve(item.target);
      }
    });
  },
  {
    threshold: 0.3,
  },
);
function observeCards() {
  let productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    showCarats.observe(card);
  });
}

function renderProducts(products) {
  cards.innerHTML = products
    .map(
      (product) => `
        <div class="product-card hidden">
          <div class="product-img-container">
            <img src="${product.image}" alt="${product.title}">
          </div>

          <div class="product-info">
            <span class="product-category">${product.category}</span>

            <h3 class="product-title">${product.title}</h3>

            <div class="product-bottom">
              <span class="product-price">
                $${product.price.toFixed(2)}
              </span>

              <button class="add-cart-btn" data-id="${product.id}">
                + Add
              </button>
            </div>
          </div>
        </div>
      `,
    )
    .join("");

  observeCards();

  // اضافه السلة ✔✔
  // ##########################################################################
  // ##########################################################################
  // ##########################################################################
  // ##########################################################################
  // ##########################################################################
  let addButtons = document.querySelectorAll(".add-cart-btn");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.dataset.id;
      addToCart(id);
    });
  });
}

function addToCart(id) {
  let product = data.find((product) => product.id == id);
  let existingProduct = cart.find((item) => item.id == id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartTotal();
}
function updateCartCount() {
  let total = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  cuet.textContent = total;
  updateCartTotal();
}
updateCartCount();
let cartButton = document.querySelector(".Salhh");
let cartBox = document.querySelector(".cart");
let cartItems = document.querySelector(".cart-items");
let closeCart = document.querySelector(".close-cart");
cartButton.addEventListener("click", () => {
  cartBox.classList.toggle("show-cart");
  overlay.classList.add("overlay-active");
  renderCart();
  updateCartTotal();
});
closeCart.addEventListener("click", () => {
  cartBox.classList.remove("show-cart");
  overlay.classList.remove("overlay-active");
});
window.addEventListener("click", (event) => {
  if (event.target === overlay) {
    cartBox.classList.remove("show-cart");
    overlay.classList.remove("overlay-active");
  }
});
function renderCart() {
  cartItems.innerHTML = cart
    .map((item) => {
      return `

  
        <div class="cart-item">
          <div>
<img
  class="cart-item-img"
  src="${item.image}"
  alt="${item.title}"

>           <h3>${item.title}</h3>
                     <div class="quantity">
            <button class="minus" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="plus" data-id="${item.id}">+</button>
          </div>
        </div>
<div >
            <p>$${item.price}</p>
          <button class="remove" data-id="${item.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
</div>
        </div>
      `;
    })
    .join("");
  removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.dataset.id;
      let product = cart.find((item) => item.id == id);
      cart = cart.filter((item) => item.id != id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
    });
  });
  let minusButtons = document.querySelectorAll(".minus");
  let plusButtons = document.querySelectorAll(".plus");

  minusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.dataset.id;
      let product = cart.find((item) => item.id == id);
      if (product.quantity > 1) {
        product.quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      }
    });
  });
  plusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.dataset.id;
      let product = cart.find((item) => item.id == id);
      product.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
    });
  });
  updateCartTotal();
}
function updateCartTotal() {
  let total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  let totalElement = document.querySelector(".cart-total");
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}
let checkoutBtn = document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Order placed successfully!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
  updateCartTotal();
});
// ################################################################################
// ################################################################################
// ################################################################################
// ################################################################################
// ################################################################################
// جلب البيانات
async function getFetch() {
  let response = await fetch("dade_600_products.json");
  data = await response.json();
  renderProducts(data);
  observeCards();
}
let searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", () => {
  let searchInputValue = searchInput.value.toLowerCase();

  let filteredData = data.filter((product) => {
    return product.title.toLowerCase().includes(searchInputValue);
  });
  cards.innerHTML = "";
  renderProducts(filteredData);
  observeCards();
});

getFetch();

let filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((button) => {
  let category = button.dataset.category;
  button.addEventListener("click", () => {
    let filteredData;

    if (category === "all") {
      filteredData = data;
    } else {
      filteredData = data.filter((product) => {
        return product.category === category;
      });
    }

    cards.innerHTML = "";
    renderProducts(filteredData);
    observeCards();
  });
});
