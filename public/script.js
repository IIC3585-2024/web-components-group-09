import { html, css, LitElement } from "../node_modules/lit";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((products) => {
      const container = document.getElementById("products-container");
      products.forEach((product) => {
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
        productOriginalPrice.textContent = `Normal: $${(
          product.original_price / 1000
        ).toFixed(3)}`;

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
    .catch((error) => console.error("Error fetching the products:", error));
});

class TodoListLit extends LitElement {
  static styles = css`
    .todo-list {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      margin: 10px 0;
    }

    .todo-list-title {
      margin: 0;
      padding: 0;
    }

    .todo-list-items {
      list-style: none;
      padding: 0;
    }

    .todo-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
    }

    .todo-list-item input {
      margin-right: 10px;
    }

    .todo-list-form {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }

    .todo-list-input {
      flex: 1;
      padding: 5px;
      margin-right: 10px;
    }

    .todo-list-add {
      padding: 5px 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .todo-list-add:hover {
      background-color: #0056b3;
    }
  `;

  static properties = {
    title: { type: String },
    prompt: { type: String },
    items: { type: Array },
    item1: { type: String },
    item2: { type: String },
    item3: { type: String },
  };

  constructor() {
    super();
    this.title = "";
    this.prompt = "";
    this.items = [];
  }

  firstUpdated() {
    if (this.item1) this.addItem(this.item1);
    if (this.item2) this.addItem(this.item2);
    if (this.item3) this.addItem(this.item3);
  }

  render() {
    return html`
      <div class="todo-list">
        <div class="todo-list-title">${this.title}</div>
        <ul class="todo-list-items">
          ${this.items.map(
            (item, index) => html`
              <li class="todo-list-item">
                ${item}
                <button
                  class="todo-item-delete"
                  @click=${() => this.deleteItem(index)}
                >
                  Delete
                </button>
              </li>
            `
          )}
        </ul>
        <input class="todo-list-input" placeholder="${this.prompt}" />
        <button class="todo-list-add" @click=${this.add}>Add</button>
      </div>
    `;
  }

  add() {
    const input = this.shadowRoot.querySelector(".todo-list-input");
    this.addItem(input.value);
    input.value = "";
  }

  addItem(text) {
    this.items = [...this.items, text];
  }

  deleteItem(index) {
    this.items = this.items.filter((_, i) => i !== index);
  }
}

customElements.define("todo-list-lit", TodoListLit);
