let currentLang = "ru";

function setLang(lang) {
    currentLang = lang;
    renderProducts();
}

function filterCategory(category) {
    renderProducts(category);
}

function renderProducts(category = "longsleeves") {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products
        .filter(product => product.category === category)
        .forEach(product => {

            container.innerHTML += `
                <div class="card premium">

                    <div class="image-block">
                        <div class="zoom-container">
                            <img class="main-image fade"
                                 src="${product.images[0]}"
                                 id="main-${product.id}"
                                 onclick="openLightbox('${product.images[0]}')">
                        </div>

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

                    <div class="description">
                        <strong>${currentLang === "ru" ? "Описание" : "Description"}:</strong>
                        <p>${product.description[currentLang]}</p>

                        <strong>${currentLang === "ru" ? "Уход" : "Care"}:</strong>
                        <p>${product.care[currentLang]}</p>
                    </div>

                    <a class="btn disabled"
                       id="btn-${product.id}"
                       href="#">
                       ${currentLang === "ru" ? "Выберите размер" : "Select size"}
                    </a>

                </div>
            `;
        });
}

function changeImage(productId, img) {
    const mainImg = document.getElementById(`main-${productId}`);
    mainImg.classList.remove("fade");

    setTimeout(() => {
        mainImg.src = img;
        mainImg.setAttribute("onclick", `openLightbox('${img}')`);
        mainImg.classList.add("fade");
    }, 150);
}

function selectSize(productId, button) {
    const card = button.closest(".card");
    const buttons = card.querySelectorAll(".sizes button");

    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const size = button.innerText.trim();
    const product = products.find(p => p.id === productId);
    const orderBtn = document.getElementById(`btn-${product.id}`);

    orderBtn.classList.remove("disabled");
    orderBtn.innerText = currentLang === "ru" ? "Заказать" : "Order";

    orderBtn.href =
        `https://wa.me/996774729149?text=${encodeURIComponent(
            currentLang === "ru"
                ? `Здравствуйте, хочу заказать ${product.name[currentLang]} размер ${size}`
                : `Hello, I want to order ${product.name[currentLang]} size ${size}`
        )}`;
}

/* LIGHTBOX */
function openLightbox(img) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <img src="${img}">
    `;
    lightbox.onclick = () => lightbox.remove();
    document.body.appendChild(lightbox);
}

renderProducts();
