export function load(ctx) {
  let componentName = 'sbadmin-content-page';
  let count = -1;
  customElements.define(componentName, class sbadmin_content_page extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.collapse:not(.show) {
    display: none;
}
*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<div class="collapse multi-collapse"></div>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
    }

    show() {
      this.rootElement.classList.add('show');
    }

    hide() {
      this.rootElement.classList.remove('show');
    }

    onBeforeHooks() {
      this.name = this.context.assemblyName;
      this.rootComponent.contentPages.set(this.name, this);
      this.onSelected = (obj) => {
        this.emit('selected', obj);
      };
    }

  
  });
};