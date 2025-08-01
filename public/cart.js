function updateCartDisplay() {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    let cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = ''; // Clear the cart element

    cart.forEach(item => {
        let subtotal = (item.price * item.quantity).toFixed(2);
        cartItemsElement.innerHTML += `
            <div class="cart-item">
            <img src="${item.src}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-description">${item.name}</div>
                <input class="cart-item-quantity" type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
                <div class="cart-item-subtotal">$${subtotal}</div>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
    });

    // Update total price
    let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = 'Total: $' + totalPrice.toFixed(2);
}

function removeFromCart(productName) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay(); // Update the display after an item is removed
}

function updateQuantity(productName, quantity) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    let item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity = parseInt(quantity, 10);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay(); // Update the display after quantity is changed
    }
}

// Calls updateCartDisplay to update the cart when the page loads
document.addEventListener('DOMContentLoaded', updateCartDisplay);