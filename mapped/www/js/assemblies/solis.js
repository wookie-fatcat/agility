export function load() {
  let gx=`
<sbadmin-content-page golgi:hook="solis">
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="SolisCloud Credentials" />
    <sbadmin-card-body>
      <sbadmin-form golgi:ref="form">
        <fieldset>
          <sbadmin-input type="text" name="inverterSn" label="Inverter Serial Number:" placeholder="16 digit number" />
          <sbadmin-input type="text" name="key" label="Control API Key:" placeholder="19 digit numeric key value" />
          <sbadmin-input type="text" name="secret" label="Control API Secret" />
          <sbadmin-input type="text" name="endpoint" label="SolisCloud Endpoint URL" />
          <sbadmin-button color="green" text="Save Changes" golgi:ref="saveBtn" />
        </fieldset>
      </sbadmin-form>

      <sbadmin-spacer />

      <sbadmin-div golgi:ref="tests">
        <sbadmin-card-text>Test your SolisCloud API Credentials Below:</sbadmin-card-text>

        <sbadmin-form golgi:ref="testingform">
          <fieldset>
            <sbadmin-button-group>
              <sbadmin-button color="blue" text="Fetch your SolisCloud Data" golgi:ref="fetchBtn" />
              <sbadmin-button color="red" text="Charge Batteries (5 min)" golgi:ref="chargeBtn" />
              <sbadmin-button color="orange" text="Clear Results" golgi:ref="clearBtn" />
            </sbadmin-button-group>
            <sbadmin-card-text golgi:ref="testResults"></sbadmin-card-text>

          </fieldset>
        </sbadmin-form>
      </sbadmin-div>

    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-content-page': {
      solis: function() {

        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        let _this = this;
        this.on('selected', async function() {

          // fetch the current values

          let json = await _this.context.request('/agility/config/solisCloud');
          if (json.error) {
            _this.toast.headerTxt = 'Error';
            _this.toast.display(json.error);
          }
          else {
            for (let name in json.data) {
              _this.form.fieldsByName.get(name).value = json.data[name];
            }
          }

          _this.saveBtn.on('clicked', async () => {

            let body = {};
            for (let [name, field] of _this.form.fieldsByName) {
              body[name] = field.value;
            }

            let json = await _this.context.request('/agility/config/solisCloud', 'POST', body);
            if (json.error) {
              _this.toast.headerTxt = 'Error';
              _this.toast.display(json.error);
            }
            else {
              _this.toast.headerTxt = 'Success!';
              _this.toast.display('Update was successful');
            }
          });

          _this.fetchBtn.on('clicked', async () => {
            let json = await _this.context.request('/agility/soliscloud/test1');
            if (json.error) {
              _this.toast.headerTxt = 'Error';
              _this.toast.display(json.error + '<br>Check that your credentials are correct');
            }
            else {
              _this.toast.headerTxt = 'Success!';
              _this.toast.display('Agility was able to fetch your SolisCloud Data for today');
              _this.testResults.rootElement.innerHTML = `<p>Here is a sample:</p><p>` + JSON.stringify(json.example) + `</p>`;
            }

          });

          _this.chargeBtn.on('clicked', async () => {
            let json = await _this.context.request('/agility/solis/charge/5');
            if (json.error) {
              _this.toast.headerTxt = 'Error';
              _this.toast.display(json.error + '<br>Check that your credentials are correct');
            }
            else {
              _this.toast.headerTxt = 'Success!';
              _this.toast.display('Agility successfully told your inverter to charge your batteries');
              //_this.testResults.rootElement.innerHTML = `<p>Here is a sample:</p><p>` + JSON.stringify(json.example) + `</p>`;
            }

          });


          _this.clearBtn.on('clicked', async () => {
            _this.testResults.rootElement.textContent = '';
          });

        });
      }
    }
  };

  return {gx, hooks};
};