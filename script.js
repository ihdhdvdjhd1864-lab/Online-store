// loader
let loader = document.querySelector("#loader");
let loaderContent = document.querySelector(".loader-content");
let loaderLogo = document.querySelector(".loader-logo");
let spinner = document.querySelector(".spinner");
let spinnerP = document.querySelector("#loader p");
window.addEventListener("DOMContentLoaded", () => {
  let mode = localStorage.getItem("modal");
  if (mode === "link") {
    // Light Mode
    loader.style.backgroundColor = "white";
    loaderLogo.style.filter = "invert(0)";
    loaderContent.style.color = "#0f172a";
    spinnerP.style.color = "#0f172ac9";
  } else {
    // Dark Mode
    loader.style.backgroundColor = "#0f172a";
  }
  if (sessionStorage.getItem("loaderShown") === "true") {
    loader.classList.add("hide");
    return;
  }
  sessionStorage.setItem("loaderShown", "true");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 3000);
});
// تخزين السله
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// تخزين المفضله
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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
let arrbut = [linksnav, overlay];
arrbut.forEach((item) => {
  item.addEventListener("click", () => {
    linksnav.classList.remove("links-nav-active");
    bars.classList.remove("fa-xmark");
    bars.classList.add("fa-bars");
    overlay.classList.remove("overlay-active");
  });
});

// راقب العناصر

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
  let productCards = document.querySelectorAll(".hidden");
  productCards.forEach((card) => {
    showCarats.observe(card);
  });
}
// اضافه منتجات الاول
let cards = document.querySelector(".cards");
let data = [];

let productDetails = document.querySelector(".product-details");
let detailsImage = document.querySelector(".details-image");
let detailsTitle = document.querySelector(".details-title");
let detailsCategory = document.querySelector(".details-category");
let detailsPrice = document.querySelector(".details-price");
let detailsDescription = document.querySelector(".details-description");
let closeDetails = document.querySelector(".close-details");
let detailsAdd = document.querySelector(".details-add");
let detailsFavorite = document.querySelector(".details-favorite");
function renderProducts(products) {
  cards.innerHTML = products
    .map(
      (product) => `
    <div class="product-card hidden">
  <div class="product-img-container">
    <img src="${product.image}" alt="${product.title}" />
  </div>
  <div class="product-info">
    <span class="product-category">${product.category}</span>
    <h3 class="product-title">${product.title}</h3>
    <div class="product-bottom">
      <span class="product-price"> $${product.price.toFixed(2)} </span>
      <button class="add-cart-btn" data-id="${product.id}">  <i class="fa-solid fa-cart-plus"></i>
</button>
      <button class="details-btn" data-id="${product.id}">  <i class="fa-solid fa-eye"></i>
</button>
<button class="favorite-btn" data-id="${product.id}" title="Add to favorites">
  <i class="fa-regular fa-heart"></i>
</button>
    </div>
  </div>
</div>
      `,
    )
    .join("");

  observeCards();

  // addCart
  let addButtons = document.querySelectorAll(".add-cart-btn");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.dataset.id;
      addToCart(id);
      showToast();
    });
  });
  // addDetails
  let detailsButtons = document.querySelectorAll(".details-btn");
  detailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.dataset.id;
      let product = data.find((product) => product.id == id);
      detailsImage.src = product.image;
      detailsTitle.textContent = product.title;
      detailsCategory.textContent = product.category;
      detailsPrice.textContent = `$${product.price.toFixed(2)}`;
      detailsDescription.textContent = product.description;
      detailsAdd.dataset.id = product.id;
      detailsFavorite.dataset.id = product.id;
      productDetails.classList.add("show-details");
      overlay.classList.add("overlay-active");
    });
  });

  // addFavorite
  let favoriteButtons = document.querySelectorAll(".favorite-btn");
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.dataset.id;
      addToFavorites(id);
      showToast2();
    });
  });
}
// رسساله  بسيطه 🎉
let toast = document.querySelector("#toast");
let toastSound = document.querySelector("#toastSound");
function showToast() {
  toastSound.currentTime = 0;
  toastSound.play();
  toast.classList.add("show-toast");
  setTimeout(() => {
    toast.classList.remove("show-toast");
  }, 2500);
}

let toast2 = document.querySelector("#toast2");
function showToast2() {
  toastSound.currentTime = 0;
  toastSound.play();
  toast2.classList.add("show-toast");
  setTimeout(() => {
    toast2.classList.remove("show-toast");
  }, 2500);
}
let favoritesItems = document.querySelector(".favorites-items");
function renderFavorites() {
  if (favorites.length === 0) {
    favoritesItems.innerHTML = `<p class="favorites-empty">Your favorites are empty</p>`;
    return;
  }
  favoritesItems.innerHTML = favorites
    .map((item) => {
      return `
        <div class="favorite-item">
          <img src="${item.image}" alt="${item.title}">
          <div>
            <h3>${item.title}</h3>
            <p>$${item.price.toFixed(2)}</p>
          </div>
          <button class="remove-favorite" data-id="${item.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;
    })
    .join("");
}
function setupRemoveFavorites() {
  let removeFavoriteButtons = document.querySelectorAll(".remove-favorite");
  removeFavoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.dataset.id;
      favorites = favorites.filter((item) => item.id != id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
      updateFavoritesCount();
      setupRemoveFavorites();
    });
  });
}
function updateFavoritesCount() {
  let favoritesCount = document.querySelector(".favorites-count");
  favoritesCount.textContent = favorites.length;
}

function addToFavorites(id) {
  let product = data.find((product) => product.id == id);
  let existingProduct = favorites.find((item) => item.id == id);
  if (!existingProduct) {
    favorites.push(product);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
  updateFavoritesCount();
  setupRemoveFavorites();
}

renderFavorites();
updateFavoritesCount();
setupRemoveFavorites();
let closeFavorites = document.querySelector(".close-favorites");
closeFavorites.addEventListener("click", () => {
  favoritesBox.classList.remove("show-favorites");
  overlay.classList.remove("overlay-active");
});
closeDetails.addEventListener("click", () => {
  productDetails.classList.remove("show-details");
  overlay.classList.remove("overlay-active");
});
detailsAdd.addEventListener("click", () => {
  let id = detailsAdd.dataset.id;
  addToCart(id);
  productDetails.classList.remove("show-details");
  overlay.classList.remove("overlay-active");
  showToast();
});
detailsFavorite.addEventListener("click", () => {
  let id = detailsFavorite.dataset.id;
  addToFavorites(id);
  productDetails.classList.remove("show-details");
  overlay.classList.remove("overlay-active");
  showToast2();
});

let favoritesBtn = document.querySelector(".favorites-btn");
let favoritesBox = document.querySelector(".favorites");
favoritesBtn.addEventListener("click", () => {
  favoritesBox.classList.toggle("show-favorites");
  overlay.classList.toggle("overlay-active");
});
window.addEventListener("click", (event) => {
  if (event.target == overlay) {
    favoritesBox.classList.remove("show-favorites");
    overlay.classList.remove("overlay-active");
    cartBox.classList.remove("show-cart");
    overlay.classList.remove("overlay-active");
  }
});

// اضافه السلة ✔✔
// ##########################################################################
// ##########################################################################
// ##########################################################################

function addToCart(id) {
  //→ هاتلي المنتج من المنتجات الأصلية 🛍️
  let product = data.find((product) => product.id == id);
  // → شوف المنتج موجود في السلة ولا لأ 🛒
  let existingProduct = cart.find((item) => item.id == id);
  // لو المنتج موجود في السلة تعدل كميةه ولا لأ
  if (existingProduct) {
    existingProduct.quantity++;
  }
  // لو المنتج لا يوجود في السلة تضيفه
  else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartTotal();
}
//عدد المنتجات في السلة
let cuet = document.querySelector("#cuet");

function updateCartCount() {
  let total = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  cuet.textContent = total;
  updateCartTotal();
}
updateCartCount();
// عرض السلة اظهره
let cartButton = document.querySelector(".Salhh");
let cartBox = document.querySelector(".cart");
let cartItems = document.querySelector(".cart-items");
let closeCart = document.querySelector(".close-cart");

cartButton.addEventListener("click", () => {
  cartBox.classList.toggle("show-cart");
  overlay.classList.toggle("overlay-active");
  renderCart();
  updateCartTotal();
});

closeCart.addEventListener("click", () => {
  cartBox.classList.remove("show-cart");
  overlay.classList.remove("overlay-active");
});
// عرض منتجات السلة
function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Your cart is currently empty</p>`;
    updateCartTotal();
    return;
  }

  cartItems.innerHTML = cart
    .map((item) => {
      return `
<div class="cart-item">
  <div>
    <img class="cart-item-img" src="${item.image}" alt="${item.title}" />
    <h3>${item.title}</h3>
    <div class="quantity">
      <button class="minus" data-id="${item.id}">-</button>
      <span>${item.quantity}</span>
      <button class="plus" data-id="${item.id}">+</button>
    </div>
  </div>
  <div>
    <p>$${item.price}</p>
    <button class="remove" data-id="${item.id}">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
</div>

      `;
    })
    .join("");

  // حذف من السلة
  let removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.dataset.id;
      cart = cart.filter((item) => item.id != id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
    });
  });
  // زار زياده و نقص      -  +
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
// زار  و حساب السلة

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
    cartItems.innerHTML = `
      <div class="cart-item-success">
        <i class="fa-solid fa-circle-exclamation"></i>
        <h3>Your cart is empty!</h3>
      </div>
    `;

    return;
  }
  window.location.href = "form.html";
});
// ################################################################################
// ################################################################################
// ################################################################################
// جلب البيانات
async function getFetch() {
  let response = await fetch("products.json");
  data = await response.json();
  renderProducts(data);
}
getFetch();
function searchNew(colbak, timr) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      colbak();
    }, timr);
  };
}
let searchInput = document.querySelector("#searchInput");
searchInput.addEventListener(
  "input",
  searchNew(() => {
    let searchInputValue = searchInput.value.toLowerCase();
    let filteredData = data.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchInputValue) ||
        product.price.toString().includes(searchInputValue)
      );
    });
    if (filteredData.length === 0) {
      cards.innerHTML = `<p class="no-results">No products found</p>`;
      return;
    }
    cards.innerHTML = "";
    renderProducts(filteredData);
  }, 500),
);
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
  });
});
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let ordersCount = document.querySelector(".orders-count");
ordersCount.textContent = orders.length;
