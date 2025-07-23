let quantity1 = 0, quantity2 = 0;
  const discount1 = 5, discount2 = 5;

  function showCounter(id) {
    document.getElementById(`addBtn${id}`).style.display = 'none';
    document.getElementById(`counterBox${id}`).classList.remove('d-none');
    if (id === 1) quantity1 = 1;
    else quantity2 = 1;
    document.getElementById(`qty${id}`).innerText = 1;
    updateCartBar();
  }

  function increaseQty(id) {
    if (id === 1) quantity1++;
    else quantity2++;
    document.getElementById(`qty${id}`).innerText = id === 1 ? quantity1 : quantity2;
    updateCartBar();
  }

  function decreaseQty(id) {
    if (id === 1 && quantity1 > 0) quantity1--;
    if (id === 2 && quantity2 > 0) quantity2--;
    const qty = id === 1 ? quantity1 : quantity2;
    if (qty < 1) {
      document.getElementById(`counterBox${id}`).classList.add('d-none');
      document.getElementById(`addBtn${id}`).style.display = 'block';
    } else {
      document.getElementById(`qty${id}`).innerText = qty;
    }
    updateCartBar();
  }

  function updateCartBar() {
    const totalQty = quantity1 + quantity2;
    const totalSaving = quantity1 * discount1 + quantity2 * discount2;

    if (totalQty > 0) {
      document.getElementById('cartBar').classList.remove('d-none');
      document.getElementById('itemCount').innerText = `${totalQty} Item${totalQty > 1 ? 's' : ''}`;
      document.getElementById('saving').innerText = totalSaving;
    } else {
      document.getElementById('cartBar').classList.add('d-none');
    }

    const cart = [
      { id: 1, name: "Whole Wheat Bread", qty: quantity1, price: 50, discount: discount1 },
      { id: 2, name: "Brown Bread", qty: quantity2, price: 60, discount: discount2 }
    ].filter(item => item.qty > 0);

    localStorage.setItem('cart', JSON.stringify(cart));
  }