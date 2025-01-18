export function load(ctx) {
  let componentName = 'sbadmin-textarea';
  let count = -1;
  customElements.define(componentName, class sbadmin_textarea extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

textarea {
  resize: vertical;
}
.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-control, .dataTable-input {
    transition: none;
  }
}
.form-control[type=file] {
  overflow: hidden;
}
.form-control[type=file]:not(:disabled):not([readonly]) {
  cursor: pointer;
}
.form-control:focus {
  color: #212529;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.form-control::-webkit-date-and-time-value, {
  height: 1.5em;
}
.form-control::-moz-placeholder {
  color: #6c757d;
  opacity: 1;
}
.form-control:-ms-input-placeholder {
  color: #6c757d;
  opacity: 1;
}
.form-control::placeholder {
  color: #6c757d;
  opacity: 1;
}
.form-control:disabled, .form-control[readonly] {
  background-color: #e9ecef;
  opacity: 1;
}
.form-control::-webkit-file-upload-button {
  padding: 0.375rem 0.75rem;
  margin: -0.375rem -0.75rem;
  -webkit-margin-end: 0.75rem;
          margin-inline-end: 0.75rem;
  color: #212529;
  background-color: #e9ecef;
  pointer-events: none;
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  border-inline-end-width: 1px;
  border-radius: 0;
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-control::file-selector-button {
  padding: 0.375rem 0.75rem;
  margin: -0.375rem -0.75rem;
  -webkit-margin-end: 0.75rem;
          margin-inline-end: 0.75rem;
  color: #212529;
  background-color: #e9ecef;
  pointer-events: none;
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  border-inline-end-width: 1px;
  border-radius: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-control::-webkit-file-upload-button {
    -webkit-transition: none;
    transition: none;
  }
  .form-control::file-selector-button {
    transition: none;
  }
}
.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button {
  background-color: #dde0e3;
}
.form-control:hover:not(:disabled):not([readonly])::file-selector-button {
  background-color: #dde0e3;
}
.form-control::-webkit-file-upload-button {
  padding: 0.375rem 0.75rem;
  margin: -0.375rem -0.75rem;
  -webkit-margin-end: 0.75rem;
          margin-inline-end: 0.75rem;
  color: #212529;
  background-color: #e9ecef;
  pointer-events: none;
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  border-inline-end-width: 1px;
  border-radius: 0;
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .form-control::-webkit-file-upload-button, .dataTable-input::-webkit-file-upload-button {
    -webkit-transition: none;
    transition: none;
  }
}
.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button {
  background-color: #dde0e3;
}

.form-control-plaintext {
  display: block;
  width: 100%;
  padding: 0.375rem 0;
  margin-bottom: 0;
  line-height: 1.5;
  color: #212529;
  background-color: transparent;
  border: solid transparent;
  border-width: 1px 0;
}
.form-control-plaintext.form-control-sm, .form-control-plaintext.form-control-lg {
  padding-right: 0;
  padding-left: 0;
}

.form-control-sm {
  min-height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}
.form-control-sm::-webkit-file-upload-button {
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  -webkit-margin-end: 0.5rem;
          margin-inline-end: 0.5rem;
}
.form-control-sm::file-selector-button {
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  -webkit-margin-end: 0.5rem;
          margin-inline-end: 0.5rem;
}
.form-control-sm::-webkit-file-upload-button {
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  -webkit-margin-end: 0.5rem;
          margin-inline-end: 0.5rem;
}

.form-control-lg {
  min-height: calc(1.5em + 1rem + 2px);
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}
.form-control-lg::-webkit-file-upload-button {
  padding: 0.5rem 1rem;
  margin: -0.5rem -1rem;
  -webkit-margin-end: 1rem;
          margin-inline-end: 1rem;
}
.form-control-lg::file-selector-button {
  padding: 0.5rem 1rem;
  margin: -0.5rem -1rem;
  -webkit-margin-end: 1rem;
          margin-inline-end: 1rem;
}
.form-control-lg::-webkit-file-upload-button {
  padding: 0.5rem 1rem;
  margin: -0.5rem -1rem;
  -webkit-margin-end: 1rem;
          margin-inline-end: 1rem;
}

.form-control-color {
  width: 3rem;
  height: auto;
  padding: 0.375rem;
}
.form-control-color:not(:disabled):not([readonly]) {
  cursor: pointer;
}
.form-control-color::-moz-color-swatch {
  height: 1.5em;
  border-radius: 0.25rem;
}
.form-control-color::-webkit-color-swatch {
  height: 1.5em;
  border-radius: 0.25rem;
}

textarea.form-control, textarea.dataTable-input {
  min-height: calc(1em + 1.75rem + 2px);
}
textarea.form-control-sm {
  min-height: calc(1em + 1rem + 2px);
}
textarea.form-control-lg {
  min-height: calc(1em + 2.25rem + 2px);
}
.was-validated textarea.form-control:valid, .was-validated textarea.dataTable-input:valid, textarea.form-control.is-valid, textarea.is-valid.dataTable-input {
  padding-right: calc(1em + 1.75rem);
  background-position: top calc(0.25em + 0.4375rem) right calc(0.25em + 0.4375rem);
}
.was-validated textarea.form-control:invalid, .was-validated textarea.dataTable-input:invalid, textarea.form-control.is-invalid, textarea.is-invalid.dataTable-input {
  padding-right: calc(1em + 1.75rem);
  background-position: top calc(0.25em + 0.4375rem) right calc(0.25em + 0.4375rem);
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
<textarea class="form-control" golgi:prop="textarea" golgi:on_input="onChanged"></textarea>
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

      if (typeof state.label === 'undefined') {
        this.label.className = 'label-hidden';
      }
      else {
        this.label.textContent = state.label;
      }
      if (state.rows) {
        this.textarea.setAttribute('rows', state.rows);
      }
      if (state.cols) {
        this.textarea.setAttribute('cols', state.cols);
      }
      if (state.placeholder) {
        this.textarea.setAttribute('placeholder', state.placeholder);
      }
      if (state.readonly) {
        this.textarea.readOnly = true;
      }
      if (state.disabled) {
        this.textarea.disabled = true;
      }
      if (state.value) {
        this.textarea.value = state.value;
        this.form.emit('changed', this);
      }
      if (state.textContent) {
        this.textarea.value = state.textContent;
        this.form.emit('changed', this);
      }
      if (state.cls) {
        this.textarea.className = state.cls;
      }
      if (state.labelcls) {
        this.label.className = state.labelcls;
      }

    }

    get value() {
      return this.textarea.value;
    }

    readonly() {
      this.textarea.readOnly = true;
    }

    disable() {
      this.textarea.disabled = true;
    }

    enable() {
      this.textarea.disabled = false;
      this.textarea.readOnly = false;
    }

    set value(val) {
      this.textarea.value = val;
      this.form.emit('changed', this);
    }

    onChanged() {
      this.form.emit('changed', this);
    }

    onBeforeState() {
      this.type = 'textarea';
      this.textarea.id = this.name;
      this.label.setAttribute('for', this.name);
      this.form = this.getParentComponent('sbadmin-form');
      if (this.form) {
        this.form.fields.push(this);
      }
    }

  
  });
};