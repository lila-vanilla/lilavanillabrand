let currentLang = "ru";

// Переключение языка
function setLang(lang) {
    currentLang = lang;
    renderProducts();
}

// Фильтр категории
function filterCategory(category) {
    renderProducts(category);
}

// Рендер товаров
function renderProducts(category = "longsleeves") {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products
        .filter(product => product.category === category)
        .forEach(product => {

            container.innerHTML += `
                <div class="card premium">

                    <div class="image-block">
                        <img class="main-image" 
                             src="${product.images[0]}" 
                             id="main-${product.id}">
                        
                        <div class="thumbs">
                            ${product.images.map(img =>
                                `<img src="${img}" 
                                      onclick="changeImage(${product.id}, '${img}')">`
                            ).join("")}
                        </div>
                    </div>

                    <h3>${product.name[currentLang]}</h3>

                    <div class="sizes">
                        ${product.sizes.map(size =>
                            `<button onclick="selectSize(${product.id}, this)">
                                ${size}
                             </button>`
                        ).join("")}
                    </div>

                    <div class="price">
                        ${product.price} сом
                    </div>

                    <a class="btn disabled"
                       id="btn-${product.id}"
                       href="#">
                       Выберите размер
                    </a>

                </div>
            `;
        });
}

// Смена главного фото
function changeImage(productId, img) {
    const mainImg = document.getElementById(`main-${productId}`);
    if (mainImg) {
        mainImg.src = img;
    }
}

// Выбор размера
function selectSize(productId, button) {
    const card = button.closest(".card");
    const buttons = card.querySelectorAll(".sizes button");

    // убрать active у всех
    buttons.forEach(btn => btn.classList.remove("active"));

    // добавить active выбранному
    button.classList.add("active");

    const size = button.innerText.trim();
    const product = products.find(p => p.id === productId);

    const orderBtn = document.getElementById(`btn-${productId}`);

    orderBtn.classList.remove("disabled");
    orderBtn.innerText = currentLang === "ru" ? "Заказать" : "Order";

    orderBtn.href =
        `https://wa.me/996774729149?text=${encodeURIComponent(
            (currentLang === "ru"
                ? `Здравствуйте, хочу заказать ${product.name[currentLang]} размер ${size}`
                : `Hello, I want to order ${product.name[currentLang]} size ${size}`
            )
        )}`;
}

// Первый запуск
renderProducts();
