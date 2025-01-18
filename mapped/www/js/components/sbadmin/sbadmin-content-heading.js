export function load(ctx) {
  let componentName = 'sbadmin-content-heading';
  let count = -1;
  customElements.define(componentName, class sbadmin_content_heading extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.mt-4 {
  margin-top: 1.5rem !important;
}
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}
  
</style>

<h1 class="mt-4"></h1>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.text) {
        this.rootElement.textContent = state.text;
      }
      if (state.position) {
        this.rootElement.classList.add('text-' + state.position);
      }
    }

  
  });
};