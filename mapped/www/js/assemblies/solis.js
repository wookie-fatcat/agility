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
    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-content-page': {
      solis: function() {
        let _this = this;
        this.on('selected', async function() {

          // fetch the current values

          let url = '/agility/config/solisCloud';
          let json = await _this.context.request(url);
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
            let url = '/agility/config/solisCloud';

            let body = {};
            for (let [name, field] of _this.form.fieldsByName) {
              body[name] = field.value;
            }

            let json = await _this.context.request(url, 'POST', body);
            if (json.error) {
              _this.toast.headerTxt = 'Error';
              _this.toast.display(json.error);
            }
            else {
              _this.toast.headerTxt = 'Success!';
              _this.toast.display('Update was successful');
            }
          });
        });
      }
    }
  };

  return {gx, hooks};
};