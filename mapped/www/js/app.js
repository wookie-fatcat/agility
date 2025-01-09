(async () => {
  async function go() {
    const {golgi} = await import('https://cdn.jsdelivr.net/gh/robtweed/golgi/src/golgi.min.js');

    let context = {
      assemblyPath: window.location.origin + '/js/assemblies/',
      componentPaths: {
        sbadmin: 'https://robtweed.github.io/golgi-sbadmin/components/'
      },
      request: async (url, method, body) => {
        url = window.location.origin + url;
        method = method || 'GET';
        let options = {
          method: method,
          headers: {
            'Content-type': 'application/json'
          }
        };
        if (body) {
          options.body = JSON.stringify(body);
        }
        try {
          let res = await fetch(url, options);
          return await res.json();
        }
        catch(err) {
          console.log(err);
          return {
            error: 'Fetch failed',
            err: err
          }
        }
      }
    };
    golgi.logging = true;
    let rootComponent = await golgi.renderAssembly('root_assembly', 'body', context);

    /*
    // pre-load components that are needed later while things are quiet...

    setTimeout(async function() {
      let arr = ['sbadmin-content-page', 'sbadmin-spacer', 'sbadmin-card', 'sbadmin-card-header', 'sbadmin-card-body', 'sbadmin-card-text', 'sbadmin-form', 'sbadmin-input', 'sbadmin-textarea', 'sbadmin-button', 'sbadmin-modal', 'sbadmin-table', 'sbadmin-toast'];
      for (let name of arr) {
        let _module = await import(context.componentPaths.sbadmin + name + '.js');
        _module.load();
      }
    }, 500);
    */

  }

  document.addEventListener('DOMContentLoaded', function() {
    // wait for all defered scripts to load, so everything needed to get going in ready
    go();
  });

})();
