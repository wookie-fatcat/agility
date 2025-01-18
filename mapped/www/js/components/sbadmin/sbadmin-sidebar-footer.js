export function load(ctx) {
  let componentName = 'sbadmin-sidebar-footer';
  let count = -1;
  customElements.define(componentName, class sbadmin_sidebar_footer extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.sb-sidenav-footer {
    padding: 0.75rem;
}
  
</style>

<div class="sb-sidenav-footer" />
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.bgColor) {
        this.rootElement.style = 'background-color: ' + state.bgColor + ';';
      }
    }

  
  });
};