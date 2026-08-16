let cart = JSON.parse(localStorage.getItem("cart")) || [];

// EmailJS
emailjs.init({
  publicKey: "Xf-LEGt5TcnVrLD0T",
});

let successMessage = document.querySelector("#successMessage");
let successName = document.querySelector("#successName");
let orderItems = document.querySelector("#orderItems");
let orderTotal = document.querySelector("#orderTotal");

let closeCheckout = document.querySelector(".close-checkout");

closeCheckout.addEventListener("click", () => {
  window.location.href = "index.html";
});

let orders = JSON.parse(localStorage.getItem("orders")) || [];

// حساب إجمالي الطلب
let total = cart.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

let checkoutTotal = document.querySelector("#checkoutTotal");
checkoutTotal.textContent = `$${total.toFixed(2)}`;

let checkoutForm = document.querySelector("#checkoutForm");

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // بيانات العميل
  let name = document.querySelector("#customerName").value;
  let email = document.querySelector("#customerEmail").value;
  let phone = document.querySelector("#customerPhone").value;
  let city = document.querySelector("#customerCity").value;
  let address = document.querySelector("#customerAddress").value;
  let notes = document.querySelector("#customerNotes").value;

  // التحقق من رقم الهاتف
  const phoneRegex = /^01[0125]\d{8}$/;

  if (!phoneRegex.test(phone)) {
    alert("برجاء إدخال رقم هاتف مصري صحيح مكون من 11 رقم (مثال: 01012345678)");

    document.querySelector("#customerPhone").focus();
    return;
  }

  // إنشاء الطلب
  let order = {
    id: `ORD-${Date.now()}`,

    customer: {
      name: name,
      email: email,
      phone: phone,
      city: city,
      address: address,
      notes: notes,
    },

    products: cart,
    total: total,
    date: new Date().toISOString(),
  };

  // ================= EMAILJS =================
  // بيانات الطلب الي EmailJS
  let templateParams = {
    order_id: order.id,
    email: email,
    name: name,
    phone: phone,
    city: city,
    address: address,
    notes: notes,
    orders: cart.map((item) => ({
      name: item.title,
      units: item.quantity,
      price: item.price,
      image_url: item.image,
    })),

    cost: {
      shipping: "0.00",
      tax: "0.00",
      total: order.total.toFixed(2),
    },
  };

  // 1. إيميل التأكيد للعميل
  emailjs.send("service_kncr879", "template_qrmdlk4", templateParams);

  // 2. إشعار الأدمن الفوري لك
  emailjs
    .send("service_kncr879", "template_y75ix0m", templateParams)

    // ================= لو الإيميل نجح =================
    .then(() => {
      // حفظ الطلب
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      // رسالة النجاح
      successName.textContent = name;

      let itemsCount = order.products.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);

      orderItems.textContent = `${itemsCount} Items`;

      orderTotal.textContent = `$${order.total.toFixed(2)}`;

      successMessage.classList.add("show");

      // تفريغ السلة
      cart = [];

      localStorage.setItem("cart", JSON.stringify(cart));

      // الرجوع للـ Home
      setTimeout(() => {
        window.location.href = "index.html";
      }, 4000);
    })

    // ================= لو الإيميل فشل =================
    .catch((error) => {
      alert("Something went wrong while sending your order. Please try again.");
    });
});
