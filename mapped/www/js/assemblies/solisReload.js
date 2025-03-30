export function load() {
  let gx=`
<sbadmin-content-page golgi:hook="reset">
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="Reload Your Solis Data" />
    <sbadmin-card-body>
      <sbadmin-card-text>
        This operation will delete and reload your historic SolisCloud data records.
      </sbadmin-card-text>
      <sbadmin-card-text>
        We recommend that you use this operation after a time zone change: ie when we switch to and from Summer Time.
        This will ensure that the temporal indices used in the historic data records match the current time zone.
      </sbadmin-card-text>

      <sbadmin-form golgi:ref="resetform">
        <fieldset>
          <sbadmin-button color="orange" text="Reload" golgi:hook="reload" />
        </fieldset>
      </sbadmin-form>
      <sbadmin-spacer />
      <sbadmin-card-text golgi:ref="testResults"></sbadmin-card-text>


    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-content-page': {
      reset: function() {
        let _this = this;
        this.on('selected', async function() {
          _this.testResults.rootElement.innerHTML = '';
        });
      }
    },
    'sbadmin-button': {
      reload: function() {
        let _this = this;
        let contentPage = this.getParentComponent('sbadmin-content-page');
        this.on('clicked', async function() {
          contentPage.testResults.rootElement.innerHTML = '';
          _this.hide();
          contentPage.testResults.rootElement.innerHTML = 'Please wait: reloading your Solis data takes 30 seconds or so...';
          let json = await _this.context.request('/agility/solis/reload');
          if (json.error) {
            contentPage.toast.headerTxt = 'Error';
            contentPage.toast.display(json.error);
            contentPage.testResults.rootElement.innerHTML = 'An error occurred: ' + json.error;
          }
          let resp = JSON.stringify(json, null, 2);
          contentPage.testResults.rootElement.innerHTML = 'Solis Data successfully reloaded';
          contentPage.toast.display('Solis Data successfully reloaded');
          _this.show();
        });
      }
    }
  };

  return {gx, hooks};
};