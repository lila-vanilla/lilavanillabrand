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
        .filter(p => p.category === category)
        .forEach(product => {

            container.innerHTML += `
                <div class="card premium">

                    <div class="image-block">
                        <img class="main-image" src="${product.images[0]}" id="main-${product.id}">
                        
                        <div class="thumbs">
                            ${product.images.map((img, index) =>
                                `<img src="${img}" onclick="changeImage(${product.id}, '${img}')">`
                            ).join("")}
                        </div>
                    </div>

                    <h3>${product.name[currentLang]}</h3>

                    <div class="sizes">
                        ${product.sizes.map(size =>
                            `<button onclick="selectSize(${product.id}, this)">${size}</button>`
                        ).join("")}
                    </div>

                    <div class="price">${product.price} сом</div>

                    <a class="btn disabled"
                       id="btn-${product.id}"
                       href="#">
                       Выберите размер
                    </a>

                </div>
            `;
        });
}

            container.innerHTML += `
                <div class="card">
                    ${gallery}
                    <h3>${product.name[currentLang]}</h3>
                    <div class="price">${product.price} сом</div>
                    <a class="btn"
                       href="https://wa.me/996774729149?text=Здравствуйте, хочу заказать ${product.name[currentLang]}">
                       Заказать
                    </a>
                </div>
            `;
        });
}

function scrollGallery(button, direction) {
    const gallery = button.parentElement.querySelector(".gallery");
    gallery.scrollBy({
        left: direction * 300,
        behavior: "smooth"
    });
}

function changeImage(productId, img) {
    document.getElementById(`main-${productId}`).src = img;
}

function selectSize(productId, button) {
    const card = button.closest(".card");
    const buttons = card.querySelectorAll(".sizes button");

    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const size = button.innerText;
    const product = products.find(p => p.id === productId);

    const orderBtn = document.getElementById(`btn-${productId}`);
    orderBtn.classList.remove("disabled");
    orderBtn.innerText = "Заказать";
    orderBtn.href =
        `https://wa.me/996774729149?text=Здравствуйте, хочу заказать ${product.name[currentLang]} размер ${size}`;
}
