export function load(ctx) {
  let componentName = 'sbadmin-checkbox';
  let count = -1;
  customElements.define(componentName, class sbadmin_checkbox extends HTMLElement {
    constructor() {
      super();
      count++;
      const html = `
<div class="form-check">
  <input class="form-check-input" type="checkbox" golgi:prop="checkbox" golgi:on_click="onClicked">
  <label class="form-check-label" golgi:prop="label"></label>
</div>
  `;
      this.html = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {

      if (typeof state.label === 'undefined') {
        this.label.className = 'label-hidden';
        this.rootElement.classList.remove('form-check');
      }
      else {
        this.label.textContent = state.label;
      }
      if (state.readonly) {
        this.checkbox.readOnly = true;
      }
      if (state.disabled) {
        this.checkbox.disabled = true;
      }
      if (state.value) {
        this.checkbox.value = state.value;
      }
      if (state.checked) {
        this.checkbox.checked = true;
        this.onClicked();
      }
      if (state.inline) {
        this.rootElement.classList.add('form-check-inline');
      }
      if (state.cls) {
        this.checkbox.className = state.cls;
      }
      if (state.labelcls) {
        this.label.className = state.labelcls;
      }
      if (state.switch) {
        this.rootElement.classList.add('form-switch');
        this.isSwitch = true;
      }

    }

    onClicked() {
      if (this.checkbox.checked) {
        this.checkboxGroup.valuesById.set(this.checkbox.id, this.checkbox.value);
      }
      else {
        this.checkboxGroup.valuesById.delete(this.checkbox.id);      
      }
      if (!this.checkbox.checked) {
        this.checkbox.classList.toggle('showImage');
      }
      this.checkboxGroup.form.emit('changed', this.checkboxGroup);
      this.emit('clicked');
    }

    set switch(value) {
      if (value) {
        this.rootElement.classList.add('form-switch');
        this.isSwitch = true;
      }
      else {
        this.rootElement.classList.remove('form-switch');
        this.isSwitch = false;
      }
    }

    set labelText(text) {
      this.label.textContent = text;
    }

    set value(value) {
      this.checkbox.value = value;
    }

    get value() {
      return this.checkbox.value;
    }

    get isChecked() {
      return this.checkbox.checked;
    }

    check() {
      this.checkbox.checked = true;
      this.onClicked();
    }

    uncheck() {
      this.checkbox.checked = false;
      this.onClicked();
    }

    get checked() {
      return this.checkbox.checked;
    }

    readonly() {
      this.checkbox.readOnly = true;
    }

    disable() {
      this.checkbox.disabled = true;
    }

    enable() {
      this.checkbox.disabled = false;
      this.checkbox.readOnly = false;
    }

    onBeforeState() {
      let name = this.name + '';
      this.checkboxGroup = this.getParentComponent('sbadmin-checkbox-group');
      if (this.checkboxGroup) {
        this.checkbox.name = this.checkboxGroup.name;
        this.checkboxGroup.count++;
        this.checkboxGroup.checkboxes.push(this);
      }
      this.checkbox.id = name;
      this.label.setAttribute('for', name);
      this.isSwitch = false;
    }

  
  });
};