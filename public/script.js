
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

  function showTodoList() {
    productsSection.style.display = 'none';
    todoListSection.style.display = 'block';
  }

  productsLink.addEventListener('click', showProducts);
  todoListLink.addEventListener('click', showTodoList);

  showProducts();

  const productsContainer = document.getElementById('products-container');

  class ProductCard extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      this.shadowRoot.innerHTML = `
        <style>
          /* Estilos del producto */
          .product-card {
            border: 1px solid #ccc;
            padding: 10px;
            margin: 10px;
            width: 200px;
            text-align: center;
          }
          .product-image {
            width: 100%;
            height: auto;
          }
          .product-name {
            font-weight: bold;
            margin-top: 5px;
          }
          .product-price {
            color: green;
            font-size: 1.2em;
          }
          .product-original-price {
            text-decoration: line-through;
            color: red;
          }
          .product-discount {
            background-color: yellow;
            padding: 2px 5px;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 5px;
          }
          .product-rating {
            margin-top: 5px;
          }
        </style>
        <div class="product-card">
          <img class="product-image" src="https://via.placeholder.com/200x300" alt="Product Image">
          <div class="product-name"></div>
          <div class="product-price"></div>
          <div class="product-original-price"></div>
          <div class="product-discount"></div>
          <div class="product-rating"></div>
        </div>
      `;
    }

    connectedCallback() {
      const name = this.getAttribute('name');
      const price = parseFloat(this.getAttribute('price'));
      const originalPrice = parseFloat(this.getAttribute('original-price'));
      const discount = parseInt(this.getAttribute('discount'));
      const rating = parseFloat(this.getAttribute('rating'));

      this.shadowRoot.querySelector('.product-name').textContent = name;
      this.shadowRoot.querySelector('.product-price').textContent = `$${(price / 1000).toFixed(3)}`;
      this.shadowRoot.querySelector('.product-original-price').textContent = `Normal: $${(originalPrice / 1000).toFixed(3)}`;
      this.shadowRoot.querySelector('.product-discount').textContent = `${discount}%`;
      this.shadowRoot.querySelector('.product-rating').textContent = `★ ${rating}`;
    }
  }


  customElements.define('product-card', ProductCard);

  fetch('http://localhost:8000/db.json')
    .then(response => response.json())
    .then(data => {
      const products = data.products;

      products.forEach(product => {
        const productCard = document.createElement('product-card');
        productCard.setAttribute('name', product.name);
        productCard.setAttribute('price', product.price);
        productCard.setAttribute('original-price', product.original_price);
        productCard.setAttribute('discount', product.discount);
        productCard.setAttribute('rating', product.rating);

        productsContainer.appendChild(productCard);
      });
    })
    .catch(error => console.error('Error fetching the products:', error));
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
