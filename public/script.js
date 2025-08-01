// Script to handle adding products to the cart
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    updateCartCountDisplay();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            let productCard = event.target.closest('.product-card');
            let productSrc = productCard.querySelector('.product-card img').getAttribute('src');
            let productName = productCard.querySelector('.product-description').textContent;
            let productPrice = productCard.querySelector('.product-pricing').textContent.replace('$', '');
            addToCart(productName, productPrice, productSrc);
            updateCartCount(true); // Update count after adding an item
        });
    });
});

function addToCart(productName, price, productSrc) {
    let cartItem = {
        name: productName,
        src: productSrc,
        price: parseFloat(price),
        quantity: 1
    };

    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    let existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`${productName} has been added to the cart.`);
    updateCartCount(true); // Increment the cart count
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    localStorage.setItem('cartCount', totalQuantity);
    updateCartCountDisplay();
}


function updateCartCountDisplay() {
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.color = cartCount > 0 ? 'black' : 'black';
    }
}

function removeFromCart(itemId) {
    // Logic to remove the item from the cart

    let currentCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    currentCartCount = Math.max(currentCartCount - 1, 0);
    localStorage.setItem('cartCount', currentCartCount);
    updateCartCountDisplay();
    console.log('Cart count updated to:', currentCartCount);
}
