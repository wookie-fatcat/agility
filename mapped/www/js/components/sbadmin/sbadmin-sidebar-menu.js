export function load(ctx) {
  let componentName = 'sbadmin-sidebar-menu';
  let count = -1;
  customElements.define(componentName, class sbadmin_sidebar_menu extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

.sidenav-menu {
    flex-grow: 1;
}
.sidenav-menu .nav {
    flex-direction: column;
    flex-wrap: nowrap;
}
*, ::before, ::after {
    box-sizing: border-box;
}
  
</style>

<div class="sidenav-menu">
  <div class="nav accordion" golgi:prop="childrenTarget" />
</div>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
    }

    onBeforeState() {
      this.childrenTarget.id = 'sideNav_' + this.name;
      this.style = 'flex-grow: 1;';
    }

    async addMenuItem() {
      return await this.renderComponent('sbadmin-sidebar-menu-item', this.childrenTarget, this.context);
    }

    async addNestedMenu() {
      return await this.renderComponent('sbadmin-sidebar-nested-menu', this.childrenTarget, this.context);
    }

    removeMenuItems() {
      for (let item of this.menuItems) {
        item.remove();
      }
    }

    removeMenuItem(index) {
      this.menuItems[index].remove();
    }

    get menuItems() {
      return [...this.childrenTarget.children];
    }

    get menuItemCount() {
      return this.menuItems.length;
    }

    get hasMenuItems() {
      return this.menuItemCount > 0;
    }

    getMenuItem(index) {
      return this.menuItems[index];
    }


    getMenuItemActive() {
      return this.ActiveMenuComponent;
    }

    setMenuItemActive(comp) {
      this.ActiveMenuComponent = comp;
    }

    setPageActive(menuComp, pageName, obj) {

      // switch the active menu item if appropriate

      if (menuComp) {
        let activeComp = this.getMenuItemActive();
        if (activeComp) {
          activeComp.isactive = false;
        }
        menuComp.isActive = true;
        this.setMenuItemActive(menuComp);
      }

      // set selected page to active
      // first hide allcontent  pages
      let page;
      for (page of this.rootComponent.contentPages.values()) {
        page.hide();
      }
      page = this.rootComponent.contentPages.get(pageName);
     
      if (page) {
        page.show();
        if (menuComp) page.menuComponent = menuComp;
        if (page.onSelected) {
          page.onSelected.call(page, obj);
        }
      }
      this.activeContentPage = page;
    }

    async switchToPage(menuComponent, pageName, obj) {
      if (!this.rootComponent.contentPages.has(pageName)) {
        this.context.assemblyName = pageName;
        try {
          let contentPage = await this.renderAssembly(pageName, this.rootComponent.contentTarget, this.context);
        }
        catch(err) {
          console.log(err);
        }
      }
      this.setPageActive(menuComponent, pageName, obj);
    }

  
  });
};