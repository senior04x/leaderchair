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
  const productInput = findElement("#product__input_title");
const productImg = findElement(".modal-img")

if (productInput,productImg) {
  document.title = product.title
  productInput.value = product.title
  productImg.src = product.imageSrc
}
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
// function addToBasket(product) {
//   basket.push(product);
//   console.log("Savatchaga qo'shildi:", product);
//   alert(`${product.title} savatchaga qo'shildi!`);
// }



const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function (e) {
    let input = e.target.value.replace(/\D/g, ''); // Faqat raqamlarni oladi

    // Avtomatik +998 ni qo'shish
    if (!input.startsWith("998")) {
        input = "998" + input;
    }

    // Formatlash qismi: +998 XX-XXX-XX-XX
    let formattedInput = `+${input.slice(0, 3)}`;
    if (input.length > 3) {
        formattedInput += ` ${input.slice(3, 5)}`;
    }
    if (input.length > 5) {
        formattedInput += `-${input.slice(5, 8)}`;
    }
    if (input.length > 8) {
        formattedInput += `-${input.slice(8, 10)}`;
    }
    if (input.length > 10) {
        formattedInput += `-${input.slice(10, 12)}`;
    }

    e.target.value = formattedInput;
});

phoneInput.addEventListener('keydown', function (e) {
    // 998 qismidan pastni o'chirib bo'lmaydi
    if (e.key === 'Backspace' && phoneInput.value.replace(/\D/g, '').length <= 3) {
        e.preventDefault();
    }
});

// Modal va buttonlarni aniqlaymiz
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close-btn")[0];

// Modalni ochish
btn.onclick = function() {
    modal.style.display = "block";
}

// Modalni yopish faqat X tugmasi bosilganda
span.onclick = function() {
    modal.style.display = "none";
}


// Miqdor boshqaruvlarini sozlash uchun funksiya
function setupQuantityControls() {
  const plusButton = document.querySelector('.plus');
  const minusButton = document.querySelector('.minus');
  const quantityInput = document.getElementById('quantity');
  const quantityInput2 = document.getElementById('product__order_number');
  quantityInput2.value = 1
  plusButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value, 10);
    quantityInput.value = currentValue + 1;
    if (quantityInput2) {
      quantityInput2.value = currentValue + 1;
    }
  });

  minusButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value, 10);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
      if (quantityInput2) {
        quantityInput2.value = currentValue - 1;
      }
    }
  });
}

setupQuantityControls()