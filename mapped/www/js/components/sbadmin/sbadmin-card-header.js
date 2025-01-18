export function load(ctx) {
  let componentName = 'sbadmin-card-header';
  let count = -1;
  customElements.define(componentName, class sbadmin_card_header extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.card-header {
    font-weight: 500;
    padding: 1rem 1.35rem;
    margin-bottom: 0;
    background-color: rgba(33,40,50,0.03);
    border-bottom: 1px solid rgba(33,40,50,0.125);
}
.card-header:first-child {
    border-radius: 0.35rem 0.35rem 0 0;
}
h5 {
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
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
*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<h5 class="card-header"></h5>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.text) {
        this.rootElement.textContent = state.text;
      }
      if (state.textContent) {
        this.rootElement.textContent = state.textContent;
      }
      if (state.textalign) {
        this.rootElement.style.textAlign = state.textalign;
      }
    }

    setText(text) {
      this.rootElement.textContent = text;
    }

    set text(value) {
      this.rootElement.textContent = value;
    }

    set textAlign(value) {
      this.rootElement.style.textAlign = value;
    }

  
  });
};