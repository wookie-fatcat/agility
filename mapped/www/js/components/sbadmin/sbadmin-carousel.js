export function load(ctx) {
  let componentName = 'sbadmin-carousel';
  let count = -1;
  customElements.define(componentName, class sbadmin_carousel extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.carousel {
    position: relative;
}
.carousel-inner {
    position: relative;
    width: 100%;
    overflow: hidden;
}
.carousel-inner::after {
  display: block;
  clear: both;
  content: "";
}
.carousel-item.active,
.carousel-item-next,
.carousel-item-prev {
  display: block;
}

.carousel-item {
    position: relative;
    display: none;
    float: left;
    width: 100%;
    margin-right: -100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: transform .6s ease-in-out;
}

/* rtl:begin:ignore */
.carousel-item-next:not(.carousel-item-start),
.active.carousel-item-end {
  transform: translateX(100%);
}

.carousel-item-prev:not(.carousel-item-end),
.active.carousel-item-start {
  transform: translateX(-100%);
}
/* rtl:end:ignore */
.carousel-fade .carousel-item {
  opacity: 0;
  transition-property: opacity;
  transform: none;
}
.carousel-fade .carousel-item.active,
.carousel-fade .carousel-item-next.carousel-item-start,
.carousel-fade .carousel-item-prev.carousel-item-end {
  z-index: 1;
  opacity: 1;
}
.carousel-fade .active.carousel-item-start,
.carousel-fade .active.carousel-item-end {
  z-index: 0;
  opacity: 0;
  transition: opacity 0s 0.6s;
}
.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  padding: 0;
  color: #fff;
  text-align: center;
  background: none;
  border: 0;
  opacity: 0.5;
  transition: opacity 0.15s ease;
}
button:not(:disabled), [type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled) {
    cursor: pointer;
}

.carousel-control-prev {
    left: 0;
}
.carousel-control-prev, .carousel-control-next {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    padding: 0;
    color: #fff;
    text-align: center;
    background: none;
    border: 0;
    opacity: .5;
    transition: opacity .15s ease;
}
.carousel-indicators {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: 0;
  margin-right: 15%;
  margin-bottom: 1rem;
  margin-left: 15%;
  list-style: none;
}
.carousel-indicators [data-bs-target] {
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 3px;
  padding: 0;
  margin-right: 3px;
  margin-left: 3px;
  text-indent: -999px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: 0.5;
  transition: opacity 0.6s ease;
}
@media (prefers-reduced-motion: reduce) {
  .carousel-indicators [data-bs-target] {
    transition: none;
  }
}
.carousel-indicators .active {
  opacity: 1;
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
button {
    border-radius: 0;
}

.carousel-control-next {
    right: 0;
}

.carousel-item.active, .carousel-item-next, .carousel-item-prev {
    display: block;
}


.carousel-dark .carousel-control-prev-icon, .carousel-dark .carousel-control-next-icon {
    filter: invert(1) grayscale(100);
}
.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e");
}

.carousel-control-next-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}
.carousel-control-prev-icon, .carousel-control-next-icon {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
}
.visually-hidden, .visually-hidden-focusable:not(:focus):not(:focus-within) {
    position: absolute!important;
    width: 1px!important;
    height: 1px!important;
    padding: 0!important;
    margin: -1px!important;
    overflow: hidden!important;
    clip: rect(0,0,0,0)!important;
    white-space: nowrap!important;
    border: 0!important;
}

*, ::before, ::after {
    box-sizing: border-box;
}

  
</style>

<div class="carousel carousel-dark slide" data-bs-ride="false" data-bs-interval="false">
  <div class="carousel-inner" golgi:prop="childrenTarget"></div>
  <button class="carousel-control-prev" golgi:prop="leftBtn" type="button" data-bs-slide="prev" golgi:on_click="previous">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" golgi:prop="rightBtn" data-bs-slide="next" golgi:on_click="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.noControls) {
        this.rootElement.removeChild(this.leftBtn);
        this.rootElement.removeChild(this.rightBtn);
      }
      if (typeof state.interval !== 'undefined') {
        this.rootElement.setAttribute('data-bs-interval', state.interval);
      }
      if (state.operation === 'manual') {
        this.rootElement.setAttribute('data-bs-interval', "false");
      }
      if (state.operation === 'auto') {
        this.rootElement.setAttribute('data-bs-ride', "carousel");
        this.rootElement.removeAttribute('data-bs-interval');
        if (state.interval) {
          // re-create carousel object with new interval);
          this.carousel = new bootstrap.Carousel(this.rootElement, {
            interval: state.interval * 1000
          });
        }
        this.carousel.cycle();
      }
    }

    onBeforeState() {
      let id = 'carousel-' + this.name;
      this.rootElement.id = id;
      this.leftBtn.setAttribute('data-bs-target', '#' + id);
      this.rightBtn.setAttribute('data-bs-target', '#' + id);
      this.carousel = new bootstrap.Carousel(this.rootElement, {
        interval: 2000
      });

      let _this = this;

      let fn = function (evt) {
        if (evt.relatedTarget) {
          let carouselItem = evt.relatedTarget.parentNode;
          _this.emit('slide', carouselItem);
        }
      };
      this.addHandler(fn, 'slid.bs.carousel');

      let ul = function() {
        _this.carousel.dispose()
      };
      this.registerUnloadMethod(ul);
    }

    next(evt) {
      this.carousel.next();
    }

    previous(evt) {
      this.carousel.prev();
    }

    removeItems() {
      let items = [...this.childrenTarget.children];
      for (let item of items) {
        item.remove();
      }
    }

    getItem(index) {
      let items = [...this.childrenTarget.children];
      return items[index];
    }

    get countItems() {
      let items = [...this.childrenTarget.children];
      return items.length;
    }

    get items() {
      return [...this.childrenTarget.children];
    }

    async addItem(assemblyName) {
      let itemComponent = await this.renderComponent('sbadmin-carousel-item', this.childrenTarget, this.context);
      if (assemblyName) {
        let rootComponent = await this.renderAssembly(assemblyName, itemComponent.childrenTarget, this.context);
        for (let name in rootComponent.refs) {
          itemComponent[name] = rootComponent.refs[name];
        }
        itemComponent.content = rootComponent;
      }
      return itemComponent;
    }

  
  });
};