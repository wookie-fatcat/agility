export function load(ctx) {
  let componentName = 'sbadmin-sidebar-heading';
  let count = -1;
  customElements.define(componentName, class sbadmin_sidebar_heading extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.sidenav-menu-heading {
  padding: 1.75rem 1rem 0.75rem;
  font-size: .7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: #a7aeb8;
  list-style: none;
}
*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<div class="sidenav-menu-heading"></div>
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
    }

  
  });
};