export function load(ctx) {
  let componentName = 'sbadmin-button-toolbar';
  let count = -1;
  customElements.define(componentName, class sbadmin_button_toolbar extends HTMLElement {
    constructor() {
      super();
      count++;
      const html = `
<div role="toolbar" aria-label="Button Toolbar"></div>

  `;
      this.html = `${html}`;
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
      this.baseStyle = 'display: flex;flex-wrap: wrap;justify-content: flex-start;';
      this.rootElement.style = this.baseStyle;
    }

    show() {
      this.rootElement.style = this.baseStyle;
    }

    hide() {
      this.rootElement.style = this.baseStyle + 'display:none;';
    }

  
  });
};