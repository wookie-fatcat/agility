export function load(ctx) {
  let componentName = 'sbadmin-form';
  let count = -1;
  customElements.define(componentName, class sbadmin_form extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
    pointer-events: auto;
}
*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<form></form>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
    }

    onBeforeState() {
      this.fields = [];
      this.fieldsByName = new Map();
    }

    get values() {
      let valArr = [];
      let _this = this;
      this.fields.forEach(function(field) {
        valArr.push({
          name: field.name,
          value: field.value
        });
      });
      return valArr;
    }

  
  });
};