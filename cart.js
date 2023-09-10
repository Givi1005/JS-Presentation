const cartItemsContainer = document.querySelector(".cart-items");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  const storedCart = cart.slice();
  if (storedCart.length === 0) {
    cartItemsContainer.innerHTML = "<i>Your cart is empty</i>";
  } else {
    cartItemsContainer.innerHTML = "";

    storedCart.forEach((product, index) => {
      const cartItem = createProductCard(product, index);
      cartItemsContainer.appendChild(cartItem);
    });
  }
}

function createProductCard(product, index) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("product-card");
  cartItem.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <i>${product.category}</i>
    <h2>${product.title}</h2>
    <p>${product.price}$</p>
    <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
  `;

  cartItem.querySelector(".delete-btn").addEventListener("click", () => {
    removeFromCart(index);
    displayCart();
  });

  return cartItem;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
}

displayCart();
