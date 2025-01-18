export function load(ctx) {
  let componentName = 'sbadmin-toast';
  let count = -1;
  customElements.define(componentName, class sbadmin_toast extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.toast {
  width: 350px;
  max-width: 100%;
  font-size: 0.875rem;
  pointer-events: auto;
  background-color: rgba(255, 255, 255, 0.85);
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15);
  border-radius: 0.35rem;
  z-index: 1055;
}
.toast.showing {
  opacity: 0;
}
.toast:not(.show) {
  display: none;
}

.toast-container {
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  max-width: 100%;
  pointer-events: none;
}
.toast-container > :not(:last-child) {
  margin-bottom: 0.75rem;
}

.toast-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  color: #69707a;
  background-color: rgba(255, 255, 255, 0.85);
  background-clip: padding-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top-left-radius: calc(0.35rem - 1px);
  border-top-right-radius: calc(0.35rem - 1px);
}
.toast-header .btn-close {
  margin-right: -0.375rem;
  margin-left: 0.75rem;
}

.toast-body {
  padding: 0.75rem;
  word-wrap: break-word;
}
.align-items-start {
  align-items: flex-start !important;
}

.align-items-end {
  align-items: flex-end !important;
}

.align-items-center {
  align-items: center !important;
}

.align-items-baseline {
  align-items: baseline !important;
}

.align-items-stretch {
  align-items: stretch !important;
}

.position-absolute {
  position: absolute !important;
}

.border-top {
  border-top: 1px solid #e0e5ec !important;
}

.top-0 {
  top: -15px !important;
}

.start-50 {
  left: 50% !important;
}

.me-auto {
  margin-right: auto !important;
}

.translate-middle-x {
  transform: translateX(-50%) !important;
}

.text-muted {
  --bs-text-opacity: 1;
  color: #a7aeb8 !important;
}

.d-flex {
  display: flex !important;
}

.mt-0 {
  margin-top: 0 !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

.mt-3 {
  margin-top: 1rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.mt-5 {
  margin-top: 2.5rem !important;
}

.mt-10 {
  margin-top: 6rem !important;
}

.mt-15 {
  margin-top: 9rem !important;
}

.mt-auto {
  margin-top: auto !important;
}
.pt-0 {
  padding-top: 0 !important;
}

.pt-1 {
  padding-top: 0.25rem !important;
}

.pt-2 {
  padding-top: 0.5rem !important;
}

.pt-3 {
  padding-top: 1rem !important;
}

.pt-4 {
  padding-top: 1.5rem !important;
}

.pt-5 {
  padding-top: 2.5rem !important;
}

.pt-10 {
  padding-top: 6rem !important;
}

.pt-15 {
  padding-top: 9rem !important;
}
  
</style>

<div class="toast position-absolute top-0 start-50 translate-middle-x" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header" golgi:prop="header">
      <strong class="me-auto" golgi:prop="headerText">Error!</strong>
      <small class="text-muted" golgi:prop="headerTimeText">just now</small>
    </div>
  <div class="d-flex">
    <div class="toast-body" golgi:prop="childrenTarget">
      <span golgi:prop="bodyText"></span>
    </div>
  </div>
</div>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (typeof state.delay !== 'undefined') {
        this.delay = state.delay;
      }
      if (typeof state.animation !== 'undefined') {
        this.animation = state.animation;
      }
      if (typeof state.autohide !== 'undefined') {
        this.autohide = (state.autohide === 'true');
      }
      if (state.headerText) {
        this.headerText.textContent = state.headerText;
      }
      if (state.headerTime) {
        this.headerTimeText.textContent = state.headerTime;
      }
      if (state.text) {
        this.bodyText.textContent = state.text;
      }

    }

    show() {
      this.rootElement.classList.add('show');
    }

    hide() {
      this.rootElement.classList.remove('show');
    }

    showHeader() {
      this.header.style.display = '';
    }

    hiderHeader() {
      this.header.style.display = 'none';
    }

    onBeforeState() {
      this.delay = 3000;
      this.animation = true;
      this.autohide = true;
    }

    onAfterHooks() {
      this.toast = new bootstrap.Toast(this.rootElement, {
        delay: this.delay,
        animation: this.animation,
        autohide: this.autohide
      });
    }

    display(text) {
      this.bodyText.innerHTML = text;
      this.toast.show();
    }

    set headerTxt(text) {
      this.headerText.textContent = text;
    }

    set timeTxt(text) {
      this.headerTimeText.textContent = text;
    }
  
  });
};