export function load(ctx) {
  let componentName = 'sbadmin-col';
  let count = -1;
  customElements.define(componentName, class sbadmin_col extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.col {
  flex: 1 0 0%;
}
.col-auto {
  flex: 0 0 auto;
  width: auto;
}

.col-1 {
  flex: 0 0 auto;
  width: 8.33333333%;
}

.col-2 {
  flex: 0 0 auto;
  width: 16.66666667%;
}

.col-3 {
  flex: 0 0 auto;
  width: 25%;
}

.col-4 {
  flex: 0 0 auto;
  width: 33.33333333%;
}

.col-5 {
  flex: 0 0 auto;
  width: 41.66666667%;
}

.col-6 {
  flex: 0 0 auto;
  width: 50%;
}

.col-7 {
  flex: 0 0 auto;
  width: 58.33333333%;
}

.col-8 {
  flex: 0 0 auto;
  width: 66.66666667%;
}

.col-9 {
  flex: 0 0 auto;
  width: 75%;
}

.col-10 {
  flex: 0 0 auto;
  width: 83.33333333%;
}

.col-11 {
  flex: 0 0 auto;
  width: 91.66666667%;
}

.col-12 {
  flex: 0 0 auto;
  width: 100%;
}
  
</style>

<div class="col" />
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.width) {
        this.classList.remove('col');
        this.classList.add('col-' + state.width);
      }
      if (state.cls) {
        let clsArr = state.cls.split(' ');
        let _this = this;
        clsArr.forEach(function(cl) {
          _this.rootElement.classList.add(cl);
        });
      }
    }

    set cls(value) {
      this.setState({cls: value});
    }

  
  });
};