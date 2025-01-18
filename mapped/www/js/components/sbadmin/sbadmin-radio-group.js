export function load(ctx) {
  let componentName = 'sbadmin-radio-group';
  let count = -1;
  customElements.define(componentName, class sbadmin_radio_group extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.form-check {
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5em;
  margin-bottom: 0.125rem;
}
.form-check .form-check-input {
  float: left;
  margin-left: -1.5em;
}
.form-check-input {
  width: 1em;
  height: 1em;
  margin-top: 0.25em;
  vertical-align: top;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid rgba(0, 0, 0, 0.25);
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  -webkit-print-color-adjust: exact;
          color-adjust: exact;
}
.form-check-input[type=checkbox] {
  border-radius: 0.25em;
}
.form-check-input[type=radio] {
  border-radius: 50%;
}
.form-check-input:active {
  filter: brightness(90%);
}
.form-check-input:focus {
  border-color: transparent;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(0, 97, 242, 0.25);
}
.form-check-input:checked {
  background-color: #0061f2;
  border-color: #0061f2;
}
.form-check-input:checked[type=checkbox] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
}
.form-check-input:checked[type=radio] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
}
.form-check-input[type=checkbox]:indeterminate {
  background-color: #0061f2;
  border-color: #0061f2;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
}
.form-check-input:disabled {
  pointer-events: none;
  filter: none;
  opacity: 0.5;
}
.form-check-input[disabled] ~ .form-check-label, .form-check-input:disabled ~ .form-check-label {
  opacity: 0.5;
}
.form-check-inline {
  display: inline-block;
  margin-right: 1rem;
}

.form-label {
    margin-bottom: 0.5rem;
}
label {
    display: inline-block;
}
label-hidden {
    display: none;
}


*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<div>
  <div golgi:prop="label"></div>
  <div golgi:prop="childrenTarget"></div>
</div>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
        if (this.form) {
          this.form.fieldsByName.set(state.name, this);
        }
      }
      if (state.label) {
        this.label.textContent = state.label;
      }
      if (state.style) {
        this.label.style = state.style;
      }
    }

    onBeforeState() {
      this.type = 'radio';
      this.optionsByName = new Map();
      this.radios = [];
      this.count = 0;
      this.form = this.getParentComponent('sbadmin-form');
      if (this.form) {
        this.form.fields.push(this);
      }
    }

    getRadioByValue(val) {
      let radio;
      for (radio of this.radios) {
        if (radio.value === val) return radio;
      }
      return false;
    }

    checkByValue(val) {
      let radio = this.getRadioByValue(val);
      if (radio) radio.check();
    }


    async renderRadios(arr) {
      // [{value: 'red', label: 'Red', checked: true}, {value: 'green', label: 'green'}]
      // specify the method setState in the StateMap to get these applied automatically

      await this.renderComponentMap('sbadmin-radio', this.childrenTarget, ctx, arr, 'radio_items:setState');
    }

  
  });
};