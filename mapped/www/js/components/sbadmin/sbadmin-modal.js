export function load(ctx) {
  let componentName = 'sbadmin-modal';
  let count = -1;
  customElements.define(componentName, class sbadmin_modal extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1055;
    display: none;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
}
.modal.show {
  display: block;
}

.modal.show .modal-dialog {
    transform: none;
}
.modal-dialog {
    position: relative;
    width: auto;
    margin: 0.5rem;
    pointer-events: none;
}
.modal.fade .modal-dialog {
  transition: transform 0.5s ease-out;
}
.modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 0.5rem;
    outline: 0;
}
.modal-header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #e0e5ec;
    border-top-left-radius: calc(0.5rem - 1px);
    border-top-right-radius: calc(0.5rem - 1px);
}
.modal-title {
    margin-bottom: 0;
    line-height: 1.5;
}
h5, .h5 {
    font-size: 1.1rem;
    margin-top: 0;
    color: #363d47;
}

element.style {
    display: none;
}
.modal-header .btn-close {
    padding: 0.5rem;
    margin: -0.5rem -0.5rem -0.5rem auto;
}
button:not(:disabled), [type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled) {
    cursor: pointer;
}
.btn-close {
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em;
  color: #000;
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
  border: 0;
  border-radius: 0.35rem;
  opacity: .5;
}
.btn-close:hover {
  color: #000;
  text-decoration: none;
  opacity: 0.75;
}
.btn-close:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  opacity: 1;
}
.btn-close:disabled, .btn-close.disabled {
  pointer-events: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  opacity: 0.25;
}
.btn-close-white {
  filter: invert(1) grayscale(100%) brightness(200%);
}
button, [type=button], [type=reset], [type=submit] {
    -webkit-appearance: button;
}
button, select {
    text-transform: none;
}
input, button, select, optgroup, textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
.modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
}
.modal-footer {
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;
    align-items: center;
    justify-content: flex-end;
    padding: 0.75rem;
    border-top: 1px solid #e0e5ec;
    border-bottom-right-radius: calc(0.5rem - 1px);
    border-bottom-left-radius: calc(0.5rem - 1px);
}
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }
}
*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" golgi:prop="header"></h5>
        <button type="button" class="btn-close" aria-label="Close" golgi:prop="closeBtn" golgi:on_click="hide"></button>
      </div>
      <div class="modal-body" golgi:prop="childrenTarget"></div>
      <div class="modal-footer" golgi:prop="footer"></div>
    </div>
  </div>
</div>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.title) {
        this.header.textContent = state.title;
      }
      if (state.static === true) {
        this.modal = new bootstrap.Modal(this.rootElement, {
          keyboard: false,
          backdrop: 'static'
        });
      }
      if (state.closeButton === false) {
        this.closeBtn.style.display = 'none';
      }
    }

    set title(title) {
      this.header.textContent = title;
    }

    show() {
      this.rootElement.classList.add('show');
    }

    hide() {
      this.rootElement.classList.remove('show');
    }

    onBeforeState() {
      this.modal = new bootstrap.Modal(this.rootElement, {
        keyboard: false
      });
      this.hide();
      this.body = this.childrenTarget;
    }
  
  });
};