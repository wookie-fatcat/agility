export function load(ctx) {
  let componentName = 'sbadmin-carousel-item';
  let count = -1;
  customElements.define(componentName, class sbadmin_carousel_item extends HTMLElement {
    constructor() {
      super();
      count++;
      const html = `
<div class="carousel-item"></div>
      `;
      this.html = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.active) {
        this.rootElement.classList.add('active');
      }

      if (state.cls) {
        this.classList.add(state.cls);
      }

      if (typeof state.interval !== 'undefined') {
        this.setAttribute('data-bs-interval', state.interval);
      }

    }

    set active(value) {
      if (value) {
        this.rootElement.classList.add('active');      }
      else {
        this.rootElement.classList.remove('active');
      }
    }

    get itemNo() {
      let carousel = this.getParentComponent('sbadmin-carousel');
      return carousel.items.indexOf(this);
    }

  
  });
};