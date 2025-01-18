export function load(ctx) {
  let componentName = 'sbadmin-brand';
  let count = -1;
  customElements.define(componentName, class sbadmin_brand extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

@media (min-width: 992px)
.navbar-brand {
    width: 12rem;
}
.navbar-brand {
    width: 15rem;
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: rgba(189,221,246,0.9);
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    white-space: nowrap;
}
.ps-3 {
    padding-left: 1rem!important;
}
.txt-black {
  color: #000000; 
  font-weight: bold;
}
a {
    color: #0061f2;
    text-decoration: none;
}
*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<a class="navbar-brand ps-3" href="#">
  <span class="txt-black" golgi:prop="childrenTarget">
  </span>
</a>
      `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.text) {
        this.childrenTarget.textContent = state.text;
      }
      if (state.textContent) {
        this.childrenTarget.textContent = state.textContent;
      }
      if (state.href) {
        this.rootElement.href = state.href;
      }
      if (state.img) {
        let img = document.createElement('img');
        img.src = state.img;
        img.setAttribute('height', 56);
        this.rootElement.appendChild(img);
      }

      if (state.color) {
        this.childrenTarget.style.color = state.color;
      }

    }

    set text(value) {
      this.childrenTarget.textContent = value;
    }

  
  });
};