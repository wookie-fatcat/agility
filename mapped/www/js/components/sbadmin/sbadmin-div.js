export function load(ctx) {
  let componentName = 'sbadmin-div';
  let count = -1;
  customElements.define(componentName, class sbadmin_div extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.clearfix {
  display: block;
  clear: both;
  content: "";
}
  
</style>

<div>
  <span golgi:prop="spanTag"></span>
</div>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.text) {
        this.spanTag.textContent = state.text;
      }
      if (state.cls) {
        this.rootElement.classList.add(state.cls);
      }
    }

    set text(value) {
      this.spanTag.textContent = value;
    }

    show() {
      this.rootElement.style = "display:''";
    }

    hide() {
      this.rootElement.style = "display: none";
    }

  
  });
};