export function load(ctx) {
  let componentName = 'sbadmin-range';
  let count = -1;
  customElements.define(componentName, class sbadmin_range extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.form-label {
    margin-bottom: 0.5rem;
    color: rgba(0,0,0,.6);
}
label {
    display: inline-block;
}
INPUT:not(:-webkit-autofill), SELECT:not(:-webkit-autofill), TEXTAREA:not(:-webkit-autofill) {
    animation-name: onautofillcancel;
}
.form-range {
    width: 100%;
    height: 1.5rem;
    padding: 0;
    background-color: transparent;
}
input {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
.thumb {
    position: relative;
    display: block;
    border-radius: 50% 50% 50% 0;
    height: 30px;
    width: 30px;
    top: -100px;
    text-align: center;
    transform: scale(0);
    transform-origin: bottom;
    transition: transform 0.2s ease-in-out;
}

.thumb.thumb-active {
    transform: scale(1);
}
.thumb:after{

    position: relative;
    display: block;
    border-radius: 50% 50% 50% 0;
    text-align: center;
    transform-origin: bottom;
    transition: transform 0.2s ease-in-out;

    content:"";
    transform:translateX(-50%);
    width:100%;
    height:100%;
    top:0;
    transform:rotate(-45deg);
    background: #3b71ca;
    z-index:-1
}

.thumb-value {
    display: block;
    position: relative;
    left: -10px;
    top: 35px;
    font-size: 12px;
    line-height: 30px;
    color: #fff;
    font-weight: 500;
    z-index: 2;
}

.w-25{
    width:25%!important
}
.w-50{
    width:50%!important
}
.w-75{
    width:75%!important
}
.w-100{
    width:100%!important
}
.w-auto{
    width:auto!important
}

*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<div golgi:prop="div">
  <label class="form-label" golgi:prop="label"></label>
  <div>
    <input type="range" class="form-range" golgi:prop="input" golgi:on_mousedown="showThumb" golgi:on_mouseup="hideThumb" golgi:on_touchstart="showThumb" golgi:on_touchend="hideThumb" golgi:on_change="moveThumb" golgi:on_input="moveThumb">
    <span class="thumb" golgi:prop="thumb">
      <span class="thumb-value" golgi:prop="thumbValue"></span>
    </span>
  </div>
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
      if (state.value) {
        this.input.value = state.value;
        if (this.form) {
          this.form.emit('changed', this);
        }
      }
      if (state.min) {
        this.input.setAttribute('min', state.min);
        this.min = state.min;
      }
      if (state.max) {
        this.input.setAttribute('max', state.max);
        this.max = state.max;
      }
      if (state.step) {
        this.input.setAttribute('step', state.step);
      }
      if (state.cls) {
        this.div.className = state.cls;
      }
    }

    moveThumb() {
      let value = this.input.value;
      if (this.form) {
        this.form.emit('changed', this);
      }
      let pos = ((value - this.min) / (this.max - this.min)) * 100;
      let offset = pos * 0.03;
      pos = pos - offset;
      
      this.thumb.setAttribute('style', 'left: ' + pos + '%;');
      this.thumbValue.textContent = value;
    }

    showThumb() {
      this.moveThumb();
      this.thumb.classList.add('thumb-active');
    }

    hideThumb() {
      this.thumb.classList.remove('thumb-active');
    }

    get value() {
      return this.input.value;
    }

    set value(val) {
      this.input.value = val;
      this.form.emit('changed', this);
    }

    onBeforeState() {
      this.type = 'range';
      this.input.id = this.name;
      this.label.setAttribute('for', this.name);
      this.form = this.getParentComponent('sbadmin-form');
      if (this.form) {
        this.form.fields.push(this);
      }
      this.min = 0;
      this.max = 100;
    }


  
  });
};