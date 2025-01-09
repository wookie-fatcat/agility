export function load() {
  let gx=`
<sbadmin-content-page golgi:hook="battery">
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="Battery Settings" />
    <sbadmin-card-body>
      <sbadmin-form golgi:ref="form">
        <fieldset>
          <sbadmin-input type="text" name="storage" label="Your total battery capacity (kWh):" placeholder="numeric value" />
          <sbadmin-input type="text" name="chargeCurrent" label="Charge Current (Amps):" placeholder="numeric value between 0 and 100" />
          <sbadmin-input type="text" name="dischargeCurrent" label="Discharge Current (Amps):" placeholder="numeric value between 0 and 100" />
          <sbadmin-input type="text" name="chargeLimit" label="Maximum Battery Charge Limit (%):" placeholder="numeric value between 0 and 100" />
          <sbadmin-input type="text" name="minimumLevel" label="Minimum Battery Level (%):" placeholder="numeric value between 0 and 100" />
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
      battery: function() {
        let _this = this;
        this.on('selected', async function() {

          // fetch the current values

          let url = '/agility/config/battery';
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
            let url = '/agility/config/battery';

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