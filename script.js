let currentLang = "ru";

function setLang(lang) {
    currentLang = lang;
    renderProducts();
}

function filterCategory(category) {
    renderProducts(category);
}

function renderProducts(category = "tops") {
    const container = document.getElementById("products");
    container.innerHTML = "";

    products
        .filter(p => p.category === category)
        .forEach(product => {
            container.innerHTML += `
                <div class="card">
                    <img src="${product.image}">
                    <h3>${product.name[currentLang]}</h3>
                    <div class="price">${product.price} сом</div>
                    <a class="btn" 
                       href="https://wa.me/996XXXXXXXXX?text=Здравствуйте, хочу заказать ${product.name[currentLang]}">
                       Заказать
                    </a>
                </div>
            `;
        });
}
