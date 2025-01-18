export function load(ctx) {
  let componentName = 'sbadmin-image';
  let count = -1;
  customElements.define(componentName, class sbadmin_image extends HTMLElement {
    constructor() {
      super();
      count++;
      const html = `
<img alt="" />
  `;
      this.html = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.src) {
        this.rootElement.src = state.src;
      }
    }

    setSrc(src) {
      this.rootElement.src = src;
    }

    set src(src) {
      this.rootElement.src = src;
    }

    set cls(cls) {
      this.rootElement.classList.add(cls);
    }

    set alt(value) {
      this.rootElement.setAttribute('alt', value);
    }

  
  });
};