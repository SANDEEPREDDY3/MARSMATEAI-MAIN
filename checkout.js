   let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cartItems');
  let emptiedManually = false;

  function renderCart() {
    cartItems.innerHTML = '';
    let totalQty = 0, totalPrice = 0, totalSaving = 0;

    if (cart.length === 0) {
      document.getElementById('summaryBox').classList.add('d-none');
      if (emptiedManually) {
        document.getElementById('emptyMsg').classList.remove('d-none');
      } else {
        cartItems.innerHTML = '<div class="alert alert-info text-center">No items to display.</div>';
      }
      return;
    }

    cart.forEach((item, index) => {
      const subtotal = item.qty * item.price;
      const saving = item.qty * item.discount;
      totalQty += item.qty;
      totalPrice += subtotal;
      totalSaving += saving;

      const div = document.createElement('div');
      div.className = "bg-white p-3 mb-3 rounded shadow-sm";
      div.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${item.image}" alt="${item.name}" class="product-image">
          <div class="flex-grow-1">
            <h6>${item.name}
              <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </h6>
            <p>Qty: ${item.qty} × ₹${item.price} = ₹${subtotal}</p>
            <p class="text-success">Saved ₹${saving}</p>
          </div>
        </div>
      `;
      cartItems.appendChild(div);
    });

    document.getElementById('totalItems').innerText = totalQty;
    document.getElementById('totalPrice').innerText = totalPrice;
    document.getElementById('totalSaving').innerText = totalSaving;
  }

  function removeItem(index) {
    const itemDiv = cartItems.children[index];
    itemDiv.classList.add('fade-out-collapse');

    setTimeout(() => {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      if (cart.length === 0) emptiedManually = true;
      renderCart();
    }, 500);
  }

  function goBack() {
    window.location.href = "index.html";
  }

  function confirmOrder() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
    } else {
      window.location.href = "payment.html";
    }
  }

  renderCart();