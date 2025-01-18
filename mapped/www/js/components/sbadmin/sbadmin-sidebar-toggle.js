export function load(ctx) {
  let componentName = 'sbadmin-sidebar-toggle';
  let count = -1;
  customElements.define(componentName, class sbadmin_sidebar_toggle extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.ms-lg-2 {
    margin-left: 0.5rem!important;
}
.me-2 {
    margin-right: 0.5rem!important;
}
*, ::before, ::after {
    box-sizing: border-box;
}
button:not(:disabled), [type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled) {
    cursor: pointer;
}
button {
    -webkit-appearance: button;
    text-transform: none;
}
.btn-transparent-dark {
    background-color: transparent;
    border-color: transparent;
    color: rgba(3,4,5,0.5);
}
.btn-icon {
    padding: 0;
    justify-content: center;
    overflow: hidden;
    border-radius: 100%;
    flex-shrink: 0;
    height: calc((0.875rem * 1) + (0.875rem * 2) + (2px))!important;
    width: calc((0.875rem * 1) + (0.875rem * 2) + (2px))!important;
}
.btn {
    display: inline-flex;
    margin: 0;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    line-height: 1;
    color: #69707a;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0;
    font-size: .875rem;
    border-radius: 0.35rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}


.order-1 {
    order: 1!important;
}
.btn-icon .feather {
  margin-top: 0 !important;
}
.btn .feather {
  margin-top: -1px;
  height: 0.875rem;
  width: 0.875rem;
}
.feather {
  height: 1rem;
  width: 1rem;
  vertical-align: top;
}
@media (min-width: 992px) {
  .ms-lg-2 {
    margin-left: 0.5rem!important;
  }
}
@media (min-width: 992px) {
  .me-lg-0 {
    margin-right: 0!important;
  }
}
@media (min-width: 992px) {
  .order-lg-0 {
    order: 0!important;
  }
}
  
</style>

<button class="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" href="#!" golgi:on_click="toggle">
  <i data-feather="menu" golgi:prop="icon"></i>
</button>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.color) {
        this.rootElement.style.color = state.color;
      }
    }

    toggle(e) {
      e.preventDefault();
      this.rootComponent.toggleSideNav();
    }

    onAfterHooks() {
      this.rootComponent.toSVG(this.icon) ;
    }

  
  });
};