// جلب الطلبات من LocalStorage
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// العناصر اللي هنشتغل عليها
let ordersList = document.querySelector("#ordersList");
let ordersCount = document.querySelector("#ordersCount");

// عدد الطلبات
ordersCount.textContent = `${orders.length} Orders`;
function renderOrders() {
  if (orders.length === 0) {
    ordersList.innerHTML = `
      <div class="empty-orders">
        <i class="fa-solid fa-box-open"></i>
        <h3>No Orders Yet</h3>
        <p>You haven't placed any orders yet.</p>
      </div>
    `;
    return;
  }

  ordersList.innerHTML = orders
    .map((order) => {
      return `
        <div class="order-card">
          <div class="order-top">
            <div class="order-id-box">
              <span class="order-label">Order ID</span>
              <span class="order-id">#${order.id}</span>
              <span class="order-date">${formatDate(order.date)}</span>
            </div>

            <span class="order-status">Order Status: Completed</span>
          </div>

          <div class="customer-info">
            <h3>Customer Information</h3>

            <div class="customer-details">
              <p>
                Name:
                <strong>${order.customer.name}</strong>
              </p>

              <p>
                Phone:
                <strong>${order.customer.phone}</strong>
              </p>

              <p>
                City:
                <strong>${order.customer.city}</strong>
              </p>

              <p>
                Address:
                <strong>${order.customer.address}</strong>
              </p>
            </div>
          </div>

          <div class="order-products">
            <h3 class="order-products-title">Products</h3>

            ${order.products
              .map((product) => {
                return `
                  <div class="order-product">

                    <img
                      src="${product.image}"
                      alt="${product.title}"
                    />

                    <div class="order-product-info">
                      <h4>${product.title}</h4>

                      <p>
                        $${product.price.toFixed(2)}
                        × ${product.quantity}
                      </p>
                    </div>

                    <span class="order-product-price">
                      $${(product.price * product.quantity).toFixed(2)}
                    </span>

                  </div>
                `;
              })
              .join("")}
          </div>

          <div class="order-bottom">
            <div class="order-total-box">
              <span class="total-label">Total</span>

              <span class="order-total">
                $${order.total.toFixed(2)}
              </span>
            </div>

          </div>

        </div>
      `;
    })
    .join("");
  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}



renderOrders();


