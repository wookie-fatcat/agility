export function load(ctx) {
  let componentName = 'sbadmin-select';
  let count = -1;
  customElements.define(componentName, class sbadmin_select extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.form-select {
  display: block;
  width: 100%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 1rem;
  font-weight: 400;
  font-family: inherit;
  line-height: 1.5;
  color: #212529;
  word-wrap: normal;
  text-transform: none;
  margin: 0;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.form-select[multiple], [multiple].dataTable-selector, .form-select[size]:not([size="1"]), [size].dataTable-selector:not([size="1"]) {
  padding-right: 1.125rem;
  background-image: none;
}
.form-select:disabled, .dataTable-selector:disabled {
  background-color: #e0e5ec;
}
.form-select:-moz-focusring, .dataTable-selector:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #69707a;
}

.form-select-sm {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
}

.form-select-lg {
  padding-top: 1.125rem;
  padding-bottom: 1.125rem;
  padding-left: 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
}
.was-validated .form-select:valid, .was-validated .dataTable-selector:valid, .form-select.is-valid, .is-valid.dataTable-selector {
  border-color: #00ac69;
}
.was-validated .form-select:valid:not([multiple]):not([size]), .was-validated .dataTable-selector:valid:not([multiple]):not([size]), .was-validated .form-select:valid:not([multiple])[size="1"], .was-validated .dataTable-selector:valid:not([multiple])[size="1"], .form-select.is-valid:not([multiple]):not([size]), .is-valid.dataTable-selector:not([multiple]):not([size]), .form-select.is-valid:not([multiple])[size="1"], .is-valid.dataTable-selector:not([multiple])[size="1"] {
  padding-right: 6.1875rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23363d47' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e"), url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2300ac69' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-position: right 1.125rem center, center right 3.375rem;
  background-size: 16px 12px, calc(0.5em + 0.875rem) calc(0.5em + 0.875rem);
}
.was-validated .form-select:valid:focus, .was-validated .dataTable-selector:valid:focus, .form-select.is-valid:focus, .is-valid.dataTable-selector:focus {
  border-color: #00ac69;
  box-shadow: 0 0 0 0.25rem rgba(0, 172, 105, 0.25);
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

<label class="form-label" golgi:prop="label"></label>
<select class="form-select" golgi:prop="select" golgi:on_input="onChange"></select>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
        this.select.name = state.name;
        if (this.form) {
          this.form.fieldsByName.set(state.name, this);
        }
      }
      if (state.multiple) {
        this.select.setAttribute('multiple', 'multiple');
        this.multiple = true;
      }
      if (state.size) {
        this.select.setAttribute('size', state.size);
      }
      if (state.cls) {
        this.select.className = state.cls;
      }
      if (typeof state.label === 'undefined') {
        this.label.className = 'label-hidden';
      }
      else {
        this.label.textContent = state.label;
      }
    }

    set options(optsArr) {
      this.removeOptions();
      let _this = this;
      optsArr.forEach(function(opt) {
        let el = document.createElement('option');
        el.setAttribute('value', opt.value);
        if (opt.selected) el.setAttribute('selected', true);
        el.textContent = opt.text;
        _this.select.appendChild(el);
      });
    }

    get value() {
      if (this.multiple) {
        return Array.from(this.select.selectedOptions).map(v=>v.value);
      }
      else {
        return this.select.value;
      }
    }

    onChange() {
      this.form.emit('changed', this);
    }

    set value(val) {
      this.select.value = val;
      this.form.emit('changed', this);
    }

    set values(values) {
      let _this = this;
      values.forEach(function(val) {
        let option = _this.getOptionByValue(val);
        option[0].setAttribute('selected', true);
      });
      this.form.emit('changed', this);
    }

    removeOptions() {
      while (this.select.options && this.select.options.length > 0) {
        this.select.remove(0);
      }
    }

    getOptionByValue(value) {
      return this.select.querySelectorAll('option[value="' + value + '"]');
    }

    get selectedText() {
      return this.select.options[this.select.selectedIndex].text;
    }

    onBeforeState() {
      this.multiple = false;
      this.select.id = this.name;
      this.label.setAttribute('for', this.name);
      this.form = this.getParentComponent('sbadmin-form');
      if (this.form) {
        this.form.fields.push(this);
      }
      this.childrenTarget = this.select;
      this.type = 'select';
    }

  
  });
};