export function load(ctx) {
  let componentName = 'sbadmin-root';
  let count = -1;
  customElements.define(componentName, class sbadmin_root extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

span {
  font-family: Metropolis, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
.topnav {
    z-index: 1039;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding-left: 0;
    height: 3.625rem;
    z-index: 1039;
    font-size: .9rem;
}
.shadow {
    box-shadow: 0 .15rem 1.75rem 0 rgba(33,40,50,0.15)!important;
}
.navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
.navbar-expand {
    flex-wrap: nowrap;
    justify-content: flex-start;
}
.bg-topnav {
    --bs-bg-opacity: 1;
    background-color: #bdddf6;
}
#layoutSidenav {
    display: flex;
}
.topnav #layoutSidenav #layoutSidenav_nav {
    width: 15rem;
    height: 100vh;
    z-index: 1038;
}
.topnav #layoutSidenav #layoutSidenav_nav {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
}

#layoutSidenav #layoutSidenav_nav {
    flex-basis: 15rem;
    flex-shrink: 0;
    transition: transform .15s ease-in-out;
    z-index: 1038;
    transform: translateX(-15rem);
}
.topnav #layoutSidenav #layoutSidenav_nav .sidenav {
    padding-top: 3.625rem;
}
.sidenav-light {
    background-color: #fff;
    color: #212832;
}
.sidenav {
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex-wrap: nowrap;
    font-size: .9rem;
}
.shadow-right {
    box-shadow: .15rem 0 1.75rem 0 rgba(33,40,50,0.15)!important;
}
.navbar-nav-scroll {
    max-height: 100%;
    overflow-y: auto;
}
.sidenav-toggled #layoutSidenav #layoutSidenav_nav {
  transform: translateX(0);
}
.sidenav-toggled #layoutSidenav #layoutSidenav_content:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 1037;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}

#layoutSidenav #layoutSidenav_content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
    flex-grow: 1;
    min-height: calc(100vh - 3.625rem);
    margin-left: -15rem;
}
.px-4 {
    padding-right: 1.5rem!important;
    padding-left: 1.5rem!important;
}
.py-4 {
    padding-top: 1.5rem!important;
    padding-bottom: 1.5rem!important;
}
.container-fluid {
    width: 100%;
    padding-right: var(--bs-gutter-x,0.75rem);
    padding-left: var(--bs-gutter-x,0.75rem);
    margin-right: auto;
    margin-left: auto;
}
.bg-light {
    --bs-bg-opacity: 1;
    background-color: rgba(248, 249, 250),var(--bs-bg-opacity));
}
.mt-auto {
    margin-top: auto!important;
}
.align-items-center {
    align-items: center!important;
}
.justify-content-between {
    justify-content: space-between;
}
.justify-content-center {
    justify-content: center;
}
.d-flex {
    display: flex!important;
}
small, .small {
    font-size: .875em;
}
@media (min-width: 992px) {
  #layoutSidenav #layoutSidenav_nav {
    transform: translateX(0);
  }
  #layoutSidenav #layoutSidenav_content {
    margin-left: 0;
    transition: margin 0.15s ease-in-out;
  }

  .sidenav-toggled #layoutSidenav #layoutSidenav_nav {
    transform: translateX(-15rem);
  }
  .sidenav-toggled #layoutSidenav #layoutSidenav_content {
    margin-left: -15rem;
  }
  .sidenav-toggled #layoutSidenav #layoutSidenav_content:before {
    display: none;
  }
}
*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<span>
  <nav class="topnav navbar navbar-expand shadow navbar-mgw bg-topnav" golgi:prop="topbarTarget"></nav>

  <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
      <nav class="sidenav shadow-right sidenav-light navbar-nav-scroll" id="sidenavAccordion" golgi:prop="sidebarTarget"></nav>
    </div>
    <div id="layoutSidenav_content" golgi:prop="contentTag">
      <main>
        <div class="container-fluid px-4" golgi:prop="contentTarget"></div>
      </main>
      <footer class="py-4 bg-light mt-auto" golgi:prop="footerTag">
        <div class="container-fluid px-4">
          <div class="d-flex align-items-center justify-content-between small" golgi:prop="footerTarget"></div>
        </div>
      </footer>
    </div>
  </div>
</span>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.header_bg_color) {
        this.topbarTarget.style.backgroundColor = state.header_bg_color;
      }
      if (state.header_bg_colour) {
        this.topbarTarget.style.backgroundColor = state.header_bg_colour;
      }
      if (state.sidebar_bg_color) {
        this.sidebarTarget.style.backgroundColor = state.sidebar_bg_color;
      }
      if (state.sidebar_bg_colour) {
        this.sidebarTarget.style.backgroundColor = state.sidebar_bg_colour;
      }
      if (state.footer_bg_color) {
        this.footerTag.style.backgroundColor = state.footer_bg_color;
      }
      if (state.footer_bg_colour) {
        this.footerTag.style.backgroundColor = state.footer_bg_colour;
      }
      if (state.content_bg_color) {
        this.contentTag.style.backgroundColor = state.content_bg_color;
      }
      if (state.content_bg_colour) {
        this.contentTag.style.backgroundColor = state.content_bg_colour;
      }

      if (state.header_text_color) {
        this.topbarTarget.style.color = state.header_text_color;
      }
      if (state.header_text_colour) {
        this.topbarTarget.style.color = state.header_text_colour;
      }
      if (state.sidebar_text_color) {
        this.sidebarTarget.style.color = state.sidebar_text_color;
      }
      if (state.sidebar_text_colour) {
        this.sidebarTarget.style.color = state.sidebar_text_colour;
      }
      if (state.footer_text_color) {
        this.footerTag.style.color = state.footer_text_color;
      }
      if (state.footer_text_colour) {
        this.footerTag.style.color = state.footer_text_colour;
      }
      if (state.content_text_color) {
        this.contentTag.style.color = state.content_text_color;
      }
      if (state.content_text_colour) {
        this.contentTag.style.color = state.content_text_colour;
      }

    }

    toggleSideNav() {
      this.rootElement.classList.toggle('sidenav-toggled');
    }

    hideSideNav() {
      this.rootElement.classList.remove('sidenav-toggled');
    }

    showSideNav() {
      this.rootElement.classList.add('sidenav-toggled');
    }

    async onBeforeState() {
      this.contentPages = new Map();
      this.childrenTarget = this.contentTarget;
    }

    get shouldSidebarHide() {
      let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (w < 992) {
        return true;
      }
      return false;
    }

    toSVG(element) {
      if (typeof feather !== 'undefined' && element.parentNode) {
        const name = element.getAttribute('data-feather');
        if (name) {
          let icon = feather.icons[name];
          if (!icon) {
            icon = feather.icons['help-circle'];
          }
          const svgString = icon.toSvg();
          const svgDocument = new DOMParser().parseFromString(
            svgString,
            'image/svg+xml'
          );
          const svgElement = svgDocument.querySelector('svg');
          element.parentNode.replaceChild(svgElement, element);
        }
      }
    }

  
  });
};