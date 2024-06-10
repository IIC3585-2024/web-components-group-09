document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed")
    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById("products-container");
            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.className = "product-card";

                const productImage = document.createElement("img");
                productImage.src = "https://via.placeholder.com/200x300";
                productImage.alt = "Perfume";
                productImage.className = "product-image";

                const productName = document.createElement("div");
                productName.className = "product-name";
                productName.textContent = product.name;

                const productPrice = document.createElement("div");
                productPrice.className = "product-price";
                productPrice.textContent = `$${(product.price / 1000).toFixed(3)}`;

                const productOriginalPrice = document.createElement("div");
                productOriginalPrice.className = "product-original-price";
                productOriginalPrice.textContent = `Normal: $${(product.original_price / 1000).toFixed(3)}`;

                const productDiscount = document.createElement("div");
                productDiscount.className = "product-discount";
                productDiscount.textContent = `${product.discount}%`;

                const productRating = document.createElement("div");
                productRating.className = "product-rating";
                productRating.textContent = `★ ${product.rating}`;

                productCard.appendChild(productImage);
                productCard.appendChild(productName);
                productCard.appendChild(productPrice);
                productCard.appendChild(productOriginalPrice);
                productCard.appendChild(productDiscount);
                productCard.appendChild(productRating);

                container.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching the products:', error));
});