// Get cart details from sessionStorage
const cart = JSON.parse(sessionStorage.getItem('cart')) || {};
let totalAmount = 0;

for (let id in cart) {
  totalAmount += cart[id].quantity * cart[id].price;
}

// Create Razorpay order on backend
fetch("http://localhost:5000/create-order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    amount: totalAmount * 100 // Convert to paisa (₹100 = 10000)
  })
})
  .then(res => res.json())
  .then(data => {
    if (!data.order) {
      throw new Error("Order creation failed");
    }

    const options = {
      key: "rzp_live_2sE0V1MKb66dax", // ✅ Your LIVE key
      amount: data.order.amount,
      currency: "INR",
      name: "MarsMate Store",
      description: "E-commerce Checkout",
      image: "https://cdn-icons-png.flaticon.com/512/891/891462.png",
      order_id: data.order.id, // ✅ Mandatory for auto-capture

      handler: function (response) {
        document.getElementById("paymentStatus").innerHTML = `
          <h2>Your Payment is Successful</h2>
          <p>Payment ID: ${response.razorpay_payment_id}</p>
          <button class="btn-back" onclick="goHome()">Back to Home</button>
        `;
        sessionStorage.removeItem('cart');
      },

      prefill: {
        name: "Sandeep Reddy Gurrala",
        email: "sandeep@example.com",
        contact: "9347552146"
      },

      theme: {
        color: "#00204a"
      },

      modal: {
        ondismiss: function () {
          document.getElementById("paymentStatus").innerHTML = `
            <h2>Payment Cancelled</h2>
            <button class="btn-back" onclick="goBack()">Try Again</button>
          `;
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  })
  .catch(err => {
    console.error("Error:", err);
    document.getElementById("paymentStatus").innerHTML = `
      <h2>Something went wrong!</h2>
      <p>${err.message}</p>
      <button class="btn-back" onclick="goBack()">Try Again</button>
    `;
  });

// Navigation functions
function goHome() {
  window.location.href = "productpage.html";
}

function goBack() {
  window.location.href = "checkout.html";
}

/*
 const cart = JSON.parse(sessionStorage.getItem('cart')) || {};
    let totalAmount = 0;

    for (let id in cart) {
      totalAmount += cart[id].quantity * cart[id].price;
    }

    const options = {
      key: "rzp_live_2sE0V1MKb66dax", // Test API Key
      amount: totalAmount * 100, // in paisa (₹100 = 10000 paisa)
      currency: "INR",
      name: "Tech Store",
      description: "E-commerce Checkout",
      image: "https://cdn-icons-png.flaticon.com/512/891/891462.png", // optional logo
      handler: function (response) {
        document.getElementById("paymentStatus").innerHTML = `
          <h2>Your Payment is Successful</h2>
          <p>Payment ID: ${response.razorpay_payment_id}</p>
          <button class="btn-back" onclick="goHome()">Back to Home</button>
        `;
        sessionStorage.removeItem('cart'); // clear cart
      },
      prefill: {
        name: "Sandeep Reddy Gurrala",
        email: "sandeep@example.com",
        contact: "9347552146"
      },
      theme: {
        color: "#00204a"
      },
      modal: {
        ondismiss: function () {
          document.getElementById("paymentStatus").innerHTML = `
            <h2>Payment Cancelled</h2>
            <button class="btn-back" onclick="goBack()">Try Again</button>
          `;
        }
      }
    };

    const rzp = new Razorpay(options);
    window.onload = function () {
      rzp.open();
    };

    function goHome() {
      window.location.href = "productpage.html";
    }

    function goBack() {
      window.location.href = "checkout.html";
    }
*/
