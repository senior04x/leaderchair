import { findElement } from "./helper.js";

// MockAPI endpointi
const apiUrl = "https://66eabcde55ad32cda47a3262.mockapi.io/api/v1/leaderchair";

// Elementlar
const elWrapperProducts = findElement("#products-container");
const elTemplate = findElement("#template");

let pageCount = 1;
const perPage = 10;
let filteredProducts = [];
let basket = []; // Savatcha uchun massiv

// Mahsulotlarni olish
function fetchProducts() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      filteredProducts = data; // Ma'lumotni saqlash
      renderProducts();
    })
    .catch((error) => console.error("Xatolik yuz berdi:", error));
}

// Mahsulotlarni ekranga chiqarish
function renderProducts() {
  elWrapperProducts.innerHTML = ""; // Har safar yangi mahsulotlarni chiqarishdan oldin mavjudlarini tozalash
  const start = (pageCount - 1) * perPage;
  const end = start + perPage;
  const visibleProducts = filteredProducts.slice(start, end);

  visibleProducts.forEach((product) => {
    const newTemplate = elTemplate.content.cloneNode(true);
    const elImg = findElement(".img-responsive", newTemplate);
    elImg.src = product.imageSrc;
    elImg.dataset.id = product.id;
    elImg.addEventListener("click", () => redirectToSinglePage(product.id)); // Single pagega o'tish uchun

    const elTitle = findElement(".title", newTemplate);
    elTitle.textContent = shortenTitle(product.title); // Sarlavhani qisqartirish

    const elPriceOld = findElement(".price-old", newTemplate);
    elPriceOld.textContent = product.oldPrice + "sum";

    const elPriceNew = findElement(".price-new", newTemplate);
    elPriceNew.textContent = product.newPrice + "sum";

    const elAddToBasket = findElement(".lead", newTemplate);
    elAddToBasket.addEventListener("click", () => addToBasket(product)); // Savatchaga qo'shish uchun

    elWrapperProducts.appendChild(newTemplate);
  });
}

// Sahifa yuklanayotganda mahsulotlarni olish va ekranga chiqarish
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

// Mahsulot sarlavhasini qisqartirish
function shortenTitle(title, maxLength = 50) {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}

// Savatchaga mahsulot qo'shish
function addToBasket(product) {
  basket.push(product);
  console.log("Savatchaga qo'shildi:", product);
  alert(`${product.title} savatchaga qo'shildi!`);
}

// Mahsulotni single sahifasiga yo'naltirish
function redirectToSinglePage(productId) {
  window.location.href = `single.html?id=${productId}`;
}






