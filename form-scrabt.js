let cart = JSON.parse(localStorage.getItem("cart")) || [];

let successMessage = document.querySelector("#successMessage");
let successName = document.querySelector("#successName");
let orderItems = document.querySelector("#orderItems");
let orderTotal = document.querySelector("#orderTotal");
let closeCheckout = document.querySelector(".close-checkout");
closeCheckout.addEventListener("click", () => {
    window.location.href = "index.html";
})
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let total = cart.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);
let checkoutTotal = document.querySelector("#checkoutTotal");
checkoutTotal.textContent = `$${total.toFixed(2)}`;
let checkoutForm = document.querySelector("#checkoutForm");
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // $$$$$$$$تحزين البيانات من الفورم
  let name = document.querySelector("#customerName").value;
  let phone = document.querySelector("#customerPhone").value;
  let city = document.querySelector("#customerCity").value;
  let address = document.querySelector("#customerAddress").value;
  let notes = document.querySelector("#customerNotes").value;

  let order = {
    id: new Date(),
    customer: {
      name: name,
      phone: phone,
      city: city,
      address: address,
      notes: notes,
    },
    products: cart,
    total: total,
    date: new Date().toISOString(),
  };
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  // $$$$$$$$تحزين البيانات من الفورم
  // رساله النجاح

  successName.textContent = name;
  let itemsCount = order.products.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  orderItems.textContent = `${itemsCount} Items`;
  orderTotal.textContent = `$${order.total.toFixed(2)}`;
  successMessage.classList.add("show");
  //  تحديث  السلة بعد الطلب
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  //  اخفاء رساله النجاح
  setTimeout(() => {
    window.location.href = "index.html";
  }, 4000);
});
