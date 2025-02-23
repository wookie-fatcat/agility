export function load() {
  let gx=`
<sbadmin-content-page>
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="Solis Inverter API Tests" />
    <sbadmin-card-body>
      <sbadmin-card-text>
        If you are having problems getting Agility to instruct your inverter to charge your batteries
        from the grid, you need to check the responses being returned from your inverter via the
        SolisCloud APIs.
      </sbadmin-card-text>
      <sbadmin-card-text>
        The responses returned by the following tests will help to determine what might be going wrong.
      </sbadmin-card-text>

      <sbadmin-form golgi:ref="testingform">
        <fieldset>
          <hr />
          <sbadmin-card-text>
            Agility only currently supports the Solis S3-Wifi DataLogger
          </sbadmin-card-text>
          <sbadmin-button color="orange" text="Discover Your DataLogger Type" golgi:hook="dataLogger" />
          <hr />
          <sbadmin-spacer />
          <sbadmin-button color="blue" text="Read Inverter Charge Settings" golgi:hook="chargeSetting" />
          <sbadmin-spacer />
          <sbadmin-button color="green" text="Read Inverter Mode Settings" golgi:hook="modeSetting" />
          <sbadmin-spacer />
          <sbadmin-card-text golgi:ref="testResults"></sbadmin-card-text>
        </fieldset>
      </sbadmin-form>

    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-button': {
      chargeSetting: function() {
        let _this = this;
        let contentPage = this.getParentComponent('sbadmin-content-page');
        this.on('clicked', async function() {
          contentPage.testResults.rootElement.innerHTML = '';
          let json = await _this.context.request('/agility/solis/atRead/4643');
          if (json.error) {
            contentPage.toast.headerTxt = 'Error';
            contentPage.toast.display(json.error);
          }
          let resp = JSON.stringify(json, null, 2);
          contentPage.testResults.rootElement.innerHTML = `<p>Response:</p><pre>` + resp + `</pre>`;
        });
      },
      modeSetting: function() {
        let _this = this;
        let contentPage = this.getParentComponent('sbadmin-content-page');
        this.on('clicked', async function() {
          contentPage.testResults.rootElement.innerHTML = '';
          let json = await _this.context.request('/agility/solis/atRead/636');
          if (json.error) {
            contentPage.toast.headerTxt = 'Error';
            contentPage.toast.display(json.error);
          }
          let resp = JSON.stringify(json, null, 2);
          contentPage.testResults.rootElement.innerHTML = `<p>Response:</p><pre>` + resp + `</pre>`;
        });
      },
      dataLogger: function() {
        let _this = this;
        let contentPage = this.getParentComponent('sbadmin-content-page');
        this.on('clicked', async function() {
          contentPage.testResults.rootElement.innerHTML = '';
          let json = await _this.context.request('/agility/solis/dataLogger');
          if (json.error) {
            contentPage.toast.headerTxt = 'Error';
            contentPage.toast.display(json.error);
          }
          let resp = JSON.stringify(json, null, 2);
          contentPage.testResults.rootElement.innerHTML = `<p>Response:</p><pre>` + resp + `</pre>`;
        });
      }
    }
  };

  return {gx, hooks};
};