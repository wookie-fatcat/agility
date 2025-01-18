export function load(ctx) {
  let componentName = 'sbadmin-card-image';
  let count = -1;
  customElements.define(componentName, class sbadmin_card_image extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.img-fluid {
  max-width: 100%;
  height: auto;
}

.img-thumbnail {
  padding: 0.25rem;
  background-color: #f2f6fc;
  border: 1px solid #d4dae3;
  border-radius: 0.35rem;
  max-width: 100%;
  height: auto;
}
.card-img,
.card-img-top,
.card-img-bottom {
  width: 100%;
}

.card-img,
.card-img-top {
  border-top-left-radius: 0.35rem;
  border-top-right-radius: 0.35rem;
}

.card-img,
.card-img-bottom {
  border-bottom-right-radius: 0.35rem;
  border-bottom-left-radius: 0.35rem;
}
  
</style>

<img class="card-img-top" alt="" />
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.src) {
        this.rootElement.src = state.src;
      }
      if (state.cls) {
        this.rootElement.classList.remove('card-img-top');
        let _this = this;
        let pcs = state.cls.split(' ');
        pcs.forEach(function(cls) {
          _this.rootElement.classList.add(cls);
        });
      }
      if (state.alt) {
        this.rootElement.setAttribute('alt', state.alt);
      }
    }

    setSrc(src) {
      this.rootElement.src = src;
    }

    set src(src) {
      this.rootElement.src = src;
    }

    set cls(cls) {
      this.setState({cls: cls});
    }

    set alt(value) {
      this.rootElement.setAttribute('alt', value);
    }

  
  });
};