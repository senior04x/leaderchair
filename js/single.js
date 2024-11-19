import { findElement } from "./helper.js";

// MockAPI endpointi
const apiUrl = "https://66eabcde55ad32cda47a3262.mockapi.io/api/v1/leaderchair";

// Mahsulotni yuklash
function fetchProductById(productId) {
  fetch(`${apiUrl}/${productId}`)
    .then((response) => response.json())
    .then((product) => renderProductDetails(product))
    .catch((error) => console.error("Xatolik yuz berdi:", error));
}

// Mahsulot ma'lumotlarini ko'rsatish
function renderProductDetails(product) {
  findElement(".fh5co-heading").textContent = product.title;
  findElement(".img-responsive").src = product.imageSrc;
  findElement(".product-price-old").textContent = product.oldPrice + " sum";
  findElement(".product-price-new").textContent = product.newPrice + " sum";
  findElement(".product-description").textContent = product.description;
}

// URL'dan ID ni olish
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Mahsulotni yuklash
if (productId) {
  fetchProductById(productId);
} else {
  console.error("ID topilmadi!");
}
// Savatchaga mahsulot qo'shish
function addToBasket(product) {
  basket.push(product);
  console.log("Savatchaga qo'shildi:", product);
  alert(`${product.title} savatchaga qo'shildi!`);
}