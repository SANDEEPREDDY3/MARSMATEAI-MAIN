  function goBack() {
    window.location.href = "checkout.html";
  }

  document.getElementById("paymentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    localStorage.removeItem("cart");

    alert("✅ Your order has been placed!");
    window.location.href = "index.html";
  });