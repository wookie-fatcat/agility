export function load(ctx) {
  let componentName = 'sbadmin-copyright';
  let count = -1;
  customElements.define(componentName, class sbadmin_copyright extends HTMLElement {
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

<p class="txt-small inline">
  <span>Copyright &copy; </span>
  <span golgi:prop="textTarget" />
</p>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.text) {
        this.textTarget.textContent = state.text;
      }
      if (state.textContent) {
        this.textTarget.textContent = state.textContent;
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
      this.textTarget.textContent = value;
    }

  
  });
};