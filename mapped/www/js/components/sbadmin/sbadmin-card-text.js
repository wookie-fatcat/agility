export function load(ctx) {
  let componentName = 'sbadmin-card-text';
  let count = -1;
  customElements.define(componentName, class sbadmin_card_text extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.card-text:last-child {
  margin-bottom: 0;
}
.text-muted {
  --bs-text-opacity: 1;
  color: #6c757d !important;
}
.font-monospace {
  font-family: var(--bs-font-monospace) !important;
}

.fs-1 {
  font-size: calc(1.275rem + 0.3vw) !important;
}

.fs-2 {
  font-size: calc(1.265rem + 0.18vw) !important;
}

.fs-3 {
  font-size: calc(1.255rem + 0.06vw) !important;
}

.fs-4 {
  font-size: 1.2rem !important;
}

.fs-5 {
  font-size: 1.1rem !important;
}

.fs-6 {
  font-size: 1rem !important;
}

.fst-italic {
  font-style: italic !important;
}

.fst-normal {
  font-style: normal !important;
}

.fw-light {
  font-weight: 300 !important;
}

.fw-lighter {
  font-weight: lighter !important;
}

.fw-normal {
  font-weight: 400 !important;
}

.fw-bold {
  font-weight: 500 !important;
}

.fw-bolder {
  font-weight: bolder !important;
}
  
</style>

<p class="card-text"></p>
<p />
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
      if (state.smallText) {
        let el = document.createElement('small');
        el.classList.add('text-muted');
        el.textContent = state.smallText;
        this.rootElement.appendChild(el);
      }
      if (state.textContent) {
        this.rootElement.textContent = state.textContent;
      }
      if (state.cls) {
        this.rootElement.classList.add(state.cls);
      }
      if (state.fontSize) {
        this.fontSize = state.fontSize;
      }
      if (state.align) {
        this.rootElement.style.textAlign = state.align;
      }
    }

    set text(text) {
      if (this.rootComponent.useShowdown && typeof showdown === 'undefined') {
        this.rootElement.textContent = text;
        let _this = this;
        setTimeout(function() {
          _this.text = text;
        }, 100);
        return;
      }
      if (typeof showdown !== 'undefined') {
        let converter = new showdown.Converter();
        this.rootElement.innerHTML = converter.makeHtml(text);
      }
      else {
        this.rootElement.textContent = text;
      }
    }

    set fontSize(size) {
      if (size.includes('pt')) {
        this.rootElement.style.fontSize =  size;
      }
      else{
        this.rootElement.classList.add('fs-' + size);
      }
    }

  
  });
};