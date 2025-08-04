   // Fetch cart details from sessionStorage to calculate amount
    const cart = JSON.parse(sessionStorage.getItem('cart')) || {};
    let totalAmount = 0;

    for (let id in cart) {
      totalAmount += cart[id].quantity * cart[id].price;
    }

    const options = {
      key: "rzp_live_2sE0V1MKb66dax", // Your test API Key
      amount: totalAmount * 100, // in paisa (₹100 = 10000 paisa)
      currency: "INR",
      name: "Tech Store",
      description: "E-commerce Checkout",
      image: "https://cdn-icons-png.flaticon.com/512/891/891462.png", // optional logo
      handler: function (response) {
        document.getElementById("paymentStatus").innerHTML = `
          <h2>Payment Successful</h2>
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