export function load(ctx) {
  let componentName = 'sbadmin-card-pre-text';
  let count = -1;
  customElements.define(componentName, class sbadmin_card_pre_text extends HTMLElement {
    constructor() {
      super();
      count++;
      const html = `
<pre golgi:component-class="card-text"></pre>
<p></p>
      `;
      this.html = `${html}`;
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
        this.setText(state.textContent);
      }
    }

    setText(text) {
      this.rootElement.textContent = text;
    }
  
  });
};