export function load(ctx) {
  let componentName = 'sbadmin-footer-text';
  let count = -1;
  customElements.define(componentName, class sbadmin_footer_text extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.txt-small {
  font-size: 10px;
}

.inline {
  display: inline-flex
}
  
</style>

<div class="txt-small inline" golgi:prop="textTag"></div>
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
      if (state.textContent) {
        this.rootElement.textContent = state.textContent;
      }
      if (state.center === true) {
        let footer = this.rootComponent.footerTarget;
        footer.classList.remove('justify-content-between');
        footer.classList.add('justify-content-center');
      }
      if (state.color) {
        this.rootElement.style.color = state.color;
      }

    }

    set text(value) {
      this.rootElement.textContent = value;
    }


  
  });
};