export function load(ctx) {
  let componentName = 'sbadmin-card';
  let count = -1;
  customElements.define(componentName, class sbadmin_card extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

div {
  --bs-blue: #0d6efd;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #198754;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-gray-100: #f8f9fa;
  --bs-gray-200: #e9ecef;
  --bs-gray-300: #dee2e6;
  --bs-gray-400: #ced4da;
  --bs-gray-500: #adb5bd;
  --bs-gray-600: #6c757d;
  --bs-gray-700: #495057;
  --bs-gray-800: #343a40;
  --bs-gray-900: #212529;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
  --bs-success: #198754;
  --bs-info: #0dcaf0;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
  --bs-light: #f8f9fa;
  --bs-dark: #212529;
  --bs-primary-rgb: 13, 110, 253;
  --bs-secondary-rgb: 108, 117, 125;
  --bs-success-rgb: 25, 135, 84;
  --bs-info-rgb: 13, 202, 240;
  --bs-warning-rgb: 255, 193, 7;
  --bs-danger-rgb: 220, 53, 69;
  --bs-light-rgb: 248, 249, 250;
  --bs-dark-rgb: 33, 37, 41;
  --bs-white-rgb: 255, 255, 255;
  --bs-black-rgb: 0, 0, 0;
  --bs-body-color-rgb: 33, 37, 41;
  --bs-body-bg-rgb: 255, 255, 255;
  --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
  --bs-body-font-family: var(--bs-font-sans-serif);
  --bs-body-font-size: 1rem;
  --bs-body-font-weight: 400;
  --bs-body-line-height: 1.5;
  --bs-body-color: #212529;
  --bs-body-bg: #fff;
}
.card {
    box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(33,40,50,0.125);
    border-radius: 0.35rem;
}

.card-center {
  margin: auto;
}

.bg-primary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
}

.bg-secondary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-secondary-rgb), var(--bs-bg-opacity)) !important;
}

.bg-success {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-success-rgb), var(--bs-bg-opacity)) !important;
}

.bg-info {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-info-rgb), var(--bs-bg-opacity)) !important;
}

.bg-warning {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-warning-rgb), var(--bs-bg-opacity)) !important;
}

.bg-danger {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-danger-rgb), var(--bs-bg-opacity)) !important;
}

.bg-light {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) !important;
}

.bg-dark {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity)) !important;
}

.bg-black {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-black-rgb), var(--bs-bg-opacity)) !important;
}

.bg-white {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-white-rgb), var(--bs-bg-opacity)) !important;
}
.bg-body {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-body-bg-rgb), var(--bs-bg-opacity)) !important;
}
.bg-transparent {
  --bs-bg-opacity: 1;
  background-color: transparent !important;
}
.text-secondary {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity)) !important;
}

.text-success {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-success-rgb), var(--bs-text-opacity)) !important;
}

.text-info {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-info-rgb), var(--bs-text-opacity)) !important;
}

.text-warning {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-warning-rgb), var(--bs-text-opacity)) !important;
}

.text-danger {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-danger-rgb), var(--bs-text-opacity)) !important;
}

.text-light {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-light-rgb), var(--bs-text-opacity)) !important;
}

.text-dark {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-dark-rgb), var(--bs-text-opacity)) !important;
}

.text-black {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-black-rgb), var(--bs-text-opacity)) !important;
}

.text-white {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-white-rgb), var(--bs-text-opacity)) !important;
}
.border-primary {
  border-color: #0d6efd !important;
}

.border-secondary {
  border-color: #6c757d !important;
}

.border-success {
  border-color: #198754 !important;
}

.border-info {
  border-color: #0dcaf0 !important;
}

.border-warning {
  border-color: #ffc107 !important;
}

.border-danger {
  border-color: #dc3545 !important;
}

.border-light {
  border-color: #f8f9fa !important;
}

.border-dark {
  border-color: #212529 !important;
}

.border-white {
  border-color: #fff !important;
}
.h-25 {
  height: 25% !important;
}

.h-50 {
  height: 50% !important;
}

.h-75 {
  height: 75% !important;
}

.h-100 {
  height: 100% !important;
}
.h-auto {
  height: auto !important;
}
.w-25 {
  width: 25% !important;
}

.w-50 {
  width: 50% !important;
}

.w-75 {
  width: 75% !important;
}

.w-100 {
  width: 100% !important;
}

.w-auto {
  width: auto !important;
}
.text-start {
  text-align: left !important;
}

.text-end {
  text-align: right !important;
}

.text-center {
  text-align: center !important;
}
*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<div class="card"></div>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }

      if (state.textColor) {
        if (this.allowedColors.includes(state.textColor)) {
          let cls = 'text-' + state.textColor;
          this.rootElement.classList.add(cls);
          if (this.textClass) {
            this.rootElement.classList.remove(this.textClass);
          }
          this.textClass = cls;
        }
      }
      if (state.bgColor) {
        if (this.allowedColors.includes(state.bgColor)) {
          let cls = 'bg-' + state.bgColor;
          this.rootElement.classList.add(cls);
          if (this.colorClass) {
            this.rootElement.classList.remove(this.colorClass);
          }
          this.colorClass = cls;
        }
      }
      if (state.borderColor) {
        if (this.allowedColors.includes(state.borderColor)) {
          let cls = 'border-' + state.borderColor;
          this.rootElement.classList.add(cls);
          if (this.borderClass) {
            this.rootElement.classList.remove(this.borderClass);
          }
          this.borderClass = cls;
        }
      }
      if (state.equalHeight) {
        this.rootElement.classList.add('h-100');
      }
      if (state.width) {
        if (Number.isInteger(+state.width)) {
          this.rootElement.classList.add('w-' + state.width);
        }
        else {
          let style = '';
          if (this.rootElement.getAttribute('style')) style = this.rootElement.getAttribute('style');
          this.rootElement.setAttribute('style', style + 'width: ' + state.width + ';');
        }
      }
      if (state.textAlign) {
        if (state.textAlign === 'center') {
          this.rootElement.classList.add('text-center');
        }
        if (state.textAlign === 'right') {
          this.rootElement.classList.add('text-end');
        }
      }
      if (state.position === 'center') {
        let style = '';
        if (this.getAttribute('style')) style = this.getAttribute('style');
        this.setAttribute('style', style + 'margin-left: auto; margin-right: auto;');
        this.rootElement.classList.add('card-center');
      }
      if (state.cls) {
        let clsArr = state.cls.split(' ');
        let _this = this;
        clsArr.forEach(function(cl) {
          _this.rootElement.classList.add(cl);
        });
      }
      if (state.margin) {
        let style = '';
        if (this.getAttribute('style')) style = this.getAttribute('style');
        this.setAttribute('style', style + 'margin: ' + state.margin + ';');
      }
      if (state.topMargin) {
        let style = '';
        if (this.getAttribute('style')) style = this.getAttribute('style');
        this.setAttribute('style', style + 'margin-top: ' + state.topMargin + ';');
      }
      if (state.bottomMargin) {
        let style = '';
        if (this.getAttribute('style')) style = this.getAttribute('style');
        this.setAttribute('style', style + 'margin-bottom: ' + state.bottomMargin + ';');
      }
    }

    onBeforeState() {

      this.allowedColors = [
        'primary',
        'secondary',
        'warning',
        'success',
        'danger',
        'info',
        'light',
        'dark',
        'body',
        'white',
        'transparent'
      ];
    }

    show() {
      this.rootElement.style = "display:''";
    }

    hide() {
      this.rootElement.style = "display: none";
    }

  
  });
};