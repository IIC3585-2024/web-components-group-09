
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // Obtén las secciones y los enlaces del navbar
  const productsSection = document.getElementById('products-section');
  const todoListSection = document.getElementById('todo-list-section');
  const productsLink = document.querySelector('a[href="#Productos"]');
  const todoListLink = document.querySelector('a[href="#TODO_List"]');

  // Función para mostrar la sección de productos y ocultar la de TODO List
  function showProducts() {
    productsSection.style.display = 'block';
    todoListSection.style.display = 'none';
  }

  // Función para mostrar la sección de TODO List y ocultar la de productos
  function showTodoList() {
    productsSection.style.display = 'none';
    todoListSection.style.display = 'block';
  }

  // Agrega los controladores de eventos click a los enlaces del navbar
  productsLink.addEventListener('click', showProducts);
  todoListLink.addEventListener('click', showTodoList);

  // Muestra la sección de productos por defecto
  showProducts();
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

// import { html, css, LitElement } from "../node_modules/lit";

import {LitElement, html, css} from 'https://cdn.skypack.dev/lit';

class TodoListLit extends LitElement {
  static styles = css`
    .todo-list {
      font-family: 'Roboto', sans-serif; /* Cambia la tipografía */
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 20px; /* Aumenta el espaciado */
      margin: 20px 0;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); /* Añade sombras */
    }

    .todo-list-title {
      margin: 0;
      padding: 0;
      font-size: 24px; /* Aumenta el tamaño de la fuente */
      color: #333; /* Cambia el color del texto */
    }

    .todo-list-items {
      list-style: none;
      padding: 0;
      margin-top: 20px; /* Añade espacio encima de la lista de tareas */
    }

    .todo-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0; /* Aumenta el espaciado */
      border-bottom: 1px solid #ccc; /* Añade una línea divisoria */
    }

    .todo-list-item:last-child {
      border-bottom: none; /* Elimina la línea divisoria del último elemento */
    }

    .todo-list-item input {
      margin-right: 10px;
    }

    .todo-list-form {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px; /* Aumenta el espaciado */
    }

    .todo-list-input {
      flex: 1;
      padding: 10px; /* Aumenta el espaciado */
      margin-right: 10px;
      border-radius: 5px; /* Añade bordes redondeados */
      border: 1px solid #ccc; /* Añade un borde */
    }

    .todo-list-add {
      padding: 10px 20px; /* Aumenta el espaciado */
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease; /* Añade una transición */
    }

    .todo-list-add:hover {
      background-color: #0056b3;
    }

    .todo-item-delete {
      padding: 5px 10px; /* Aumenta el espaciado */
      background-color: #dc3545; /* Cambia el color de fondo */
      color: #fff; /* Cambia el color del texto */
      border: none;
      border-radius: 5px; /* Añade bordes redondeados */
      cursor: pointer;
      transition: background-color 0.3s ease; /* Añade una transición */
    }

    .todo-item-delete:hover {
      background-color: #c82333; /* Cambia el color de fondo cuando se pasa el ratón por encima */
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
