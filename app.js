const API_URL = "https://fakestoreapi.com/products";
const productsContainer = document.querySelector(".products");
const cart = [];
let products = [];

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(products) {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const productDataString = JSON.stringify(product)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <i>${product.category}</i>
    <h2>${product.title}</h2>
    <p>${product.price}$</p>
    <button class="btn btn-primary" data-product="${productDataString}">Add to Cart</button>
  `;

  return productCard;
}

productsContainer.addEventListener("click", addToCartHandler);

function addToCartHandler(e) {
  if (e.target.tagName === "BUTTON") {
    const productData = JSON.parse(e.target.dataset.product);
    addToCart(productData);
    alert("Product added to cart!");
  }
}

function addToCart(product) {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  existingCart.push(product);
  localStorage.setItem("cart", JSON.stringify(existingCart));
}

fetchProducts();

const searchForm = document.querySelector("form[role='search']");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = searchForm
    .querySelector("input[type='search']")
    .value.toLowerCase();
  filterAndDisplayProducts(searchInput);
});

const sortSelect = document.getElementById("sort-select");
sortSelect.addEventListener("change", () => {
  const selectedOption = sortSelect.value;
  sortProducts(selectedOption);
});

function filterAndDisplayProducts(searchInput) {
  const filteredProducts = products.filter((product) => {
    const productTitle = product.title.toLowerCase();
    return productTitle.includes(searchInput);
  });

  displayProducts(filteredProducts);
}

function sortProducts(selectedOption) {
  switch (selectedOption) {
    case "alphabeticalAscending":
      products.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "alphabeticalDescending":
      products.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "priceAscending":
      products.sort((a, b) => a.price - b.price);
      break;
    case "priceDescending":
      products.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  displayProducts(products);
}

const categorySelect = document.getElementById("category-select");
categorySelect.addEventListener("change", () => {
  const selectedCategory = categorySelect.value;
  filterByCategory(selectedCategory);
});

function filterByCategory(category) {
  if (category) {
    const filteredProducts = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    displayProducts(filteredProducts);
  } else {
    displayProducts(products);
  }
}
