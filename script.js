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

            let gallery = `
                <div class="gallery">
                    ${product.images.map(img => `<img src="${img}">`).join("")}
                </div>
            `;

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
