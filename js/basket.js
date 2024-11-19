// Savatchaga mahsulot qo'shish
function addToBasket(product) {
    // LocalStorage'dan savatcha o'qish yoki yangi massiv yaratish
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    
    // Mahsulotni savatchaga qo'shish
    basket.push(product);
    
    // LocalStorage'ga yozish
    localStorage.setItem('basket', JSON.stringify(basket));
    
    alert(`${product.title} added to the basket!`);
    console.log('Current Basket:', basket);
  }
  
  // Savatchani render qilish
  function renderBasket() {
    const basketItemsContainer = document.getElementById('basket-items');
    
    // Savatchani tozalash
    basketItemsContainer.innerHTML = '';
  
    // LocalStorage'dan savatcha o'qish
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
  
    if (basket.length === 0) {
      basketItemsContainer.innerHTML = '<tr><td colspan="4">Your basket is empty.</td></tr>';
      return;
    }
  
    // Mahsulotlarni render qilish
    basket.forEach((product, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${product.imageSrc}" alt="${product.title}" style="width: 50px; height: auto;"></td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td><button onclick="removeFromBasket(${index})">Remove</button></td>
      `;
      basketItemsContainer.appendChild(row);
    });
  }
  
  // Mahsulotni savatchadan o'chirish
  function removeFromBasket(index) {
    let basket = JSON.parse(localStorage.getItem('basket')) || [];
    
    // Mahsulotni massivdan olib tashlash
    basket.splice(index, 1);
    
    // Yangilangan savatchani LocalStorage'ga saqlash
    localStorage.setItem('basket', JSON.stringify(basket));
    
    // Yangilangan savatchani render qilish
    renderBasket();
  }
  
  // Savatchani tozalash
  document.getElementById('clear-basket').addEventListener('click', () => {
    localStorage.removeItem('basket'); // LocalStorage'dan savatchani o'chirish
    renderBasket(); // Bo'sh savatchani render qilish
  });
  
  // Sahifa yuklanganda savatchani render qilish
  document.addEventListener('DOMContentLoaded', () => {
    renderBasket();
  });
  