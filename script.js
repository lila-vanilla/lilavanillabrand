const productsContainer = document.getElementById("products");

function renderProducts(category) {
  productsContainer.innerHTML = "";

  const filtered = products.filter(p => p.category === category);

  filtered.forEach(product => {

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <h2 class="product-title">${product.name}</h2>

      <div class="product-sizes">
        ${product.sizes.join(" · ")}
      </div>

      <div class="product-price">
        ${product.price} ${product.currency}
      </div>

      <div class="gallery-wrapper">
        <button class="gallery-btn left" onclick="scrollGallery(this, -1)">‹</button>
        <div class="gallery">
          ${product.images.map(img => `<img src="${img}">`).join("")}
        </div>
        <button class="gallery-btn right" onclick="scrollGallery(this, 1)">›</button>
      </div>

      <div class="product-description">
        ${product.description}
      </div>

      <a class="order-btn" 
         href="https://wa.me/996774729149?text=Здравствуйте! Хочу заказать ${product.name}" 
         target="_blank">
         Заказать в WhatsApp
      </a>
    `;

    productsContainer.appendChild(productDiv);
  });
}

function scrollGallery(button, direction) {
  const gallery = button.parentElement.querySelector(".gallery");
  gallery.scrollLeft += direction * 400;
}

function filterCategory(category) {
  document.querySelectorAll(".category").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  renderProducts(category);
}

renderProducts("longsleeves");
