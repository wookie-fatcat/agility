export function load(ctx) {
  let componentName = 'sbadmin-spacer';
  let count = -1;
  customElements.define(componentName, class sbadmin_spacer extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

*, ::before, ::after {
    box-sizing: border-box;
}
div {
  opacity: 0;
}
  
</style>

<div>_</div>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

  });
};