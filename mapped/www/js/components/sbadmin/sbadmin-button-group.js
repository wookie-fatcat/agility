export function load(ctx) {
  let componentName = 'sbadmin-button-group';
  let count = -1;
  customElements.define(componentName, class sbadmin_button_group extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.btn-group,
.btn-group-vertical {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

.mx-auto {
  margin-right: auto !important;
  margin-left: auto !important;
}
  
</style>

<div class="btn-group" role="group" aria-label="Button Group"></div>

  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.cls) {
        let clsArr = state.cls.split(' ');
        let _this = this;
        clsArr.forEach(function(cl) {
          _this.rootElement.classList.add(cl);
        });
      }
      if (state.ariaLabel) {
        this.rootElement.setAttribute('aria-label', state.ariaLabel);
      }
    }

    set text(value) {
      this.spanTag.textContent = value;
    }

    set cls(value) {
      this.setState({cls: value});
    }

    onBeforeState() {
      this.buttons = [];
    }

  
  });
};