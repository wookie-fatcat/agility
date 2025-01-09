export function load(ctx) {

  let gx=`
<sbadmin-root>

  <span golgi:appendTo="topbarTarget">
    <sbadmin-sidebar-toggle />
    <sbadmin-brand text="Agility" />
  </span>

  <sbadmin-footer-text golgi:appendTo="footerTarget">
    <sbadmin-copyright text="2025 MGateway Ltd" />
  </sbadmin-footer-text>

  <sbadmin-sidebar-menu golgi:appendTo="sidebarTarget">

    <sbadmin-sidebar-menu-item iconName="power" text="System Status" contentPage="status" active="true" />

    <sbadmin-sidebar-menu-item iconName="clipboard" text="Activity Log" contentPage="log" />

    <sbadmin-sidebar-nested-menu iconName="settings" text="Configuration">
      <sbadmin-sidebar-menu-item text="SolisCloud" contentPage="solis" />
      <sbadmin-sidebar-menu-item text="Octopus" contentPage="octopus"/>
      <sbadmin-sidebar-menu-item text="Battery" contentPage="battery"/>
      <sbadmin-sidebar-menu-item text="Solcast" contentPage="solcast"/>
      <sbadmin-sidebar-menu-item text="Operation" contentPage="operation"/>
    </sbadmin-sidebar-nested-menu>
  </sbadmin-sidebar-menu>



</sbadmin-root>
  `;

  let hooks = {
    'sbadmin-sidebar-menu-item': {
    }
  };

  return {gx, hooks};
};