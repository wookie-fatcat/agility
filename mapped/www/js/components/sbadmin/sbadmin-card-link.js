export function load(ctx) {
  let componentName = 'sbadmin-card-link';
  let count = -1;
  customElements.define(componentName, class sbadmin_card_link extends HTMLElement {
    constructor() {
      super();
      count++;
      const html = `
<a href="#" class="card-link"></a>
      `;
      this.html = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }

      if (state.href) {
        this.rootElement.href = state.href;
      }

      if (state.text) {
        this.rootElement.textContent = state.text;
      }
    }

    setText(text) {
      this.rootElement.textContent = text;
    }

  
  });
};