class TodoList extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
      const template = document.getElementById('todo-list-template');
      const instance = template.content.cloneNode(true);

      instance.querySelector('.todo-list-title').textContent = this.getAttribute('title');
      instance.querySelector('.todo-list-input').placeholder = this.getAttribute('prompt');

      this.shadowRoot.appendChild(instance);

      ['item1', 'item2', 'item3'].forEach((item) => {
          this.addItem(this.getAttribute(item));
      });

      this.shadowRoot.querySelector('.todo-list-add').addEventListener('click', (event) => {
          event.preventDefault();
          const input = this.shadowRoot.querySelector('.todo-list-input');
          this.addItem(input.value);
          input.value = '';
      });
  }

  addItem(text) {
      const listItem = document.createElement('li');
      listItem.textContent = text;
      listItem.className = 'todo-list-item';

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'todo-item-delete';
      deleteButton.addEventListener('click', () => {
          listItem.remove();
      });

      listItem.appendChild(deleteButton);
      this.shadowRoot.querySelector('.todo-list-items').appendChild(listItem);
  }
}

customElements.define('todo-list', TodoList);