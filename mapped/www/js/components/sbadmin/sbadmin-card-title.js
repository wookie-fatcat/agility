export function load(ctx) {
  let componentName = 'sbadmin-card-title';
  let count = -1;
  customElements.define(componentName, class sbadmin_card_title extends HTMLElement {
    constructor() {
      super();
      count++;
      const html = `
<h5 golgi:component-class="card-title" class="card-title"></h5>
      `;
      this.html = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }

      if (state.title) {
        this.rootElement.textContent = state.title;
      }
    }

    setTitle(text) {
      this.rootElement.textContent = text;
    }

  
  });
};