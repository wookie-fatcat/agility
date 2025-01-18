export function load(ctx) {
  let componentName = 'sbadmin-icon';
  let count = -1;
  customElements.define(componentName, class sbadmin_icon extends HTMLElement {
    constructor() {
      super();
      count++;
      const html = `
<i></i>
  `;
      this.html = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.iconName) {
        this.rootElement.setAttribute('data-feather', state.iconName);
      }
    }

    onAfterHooks() {
      if (typeof feather !== 'undefined') feather.replace();
    }

  
  });
};