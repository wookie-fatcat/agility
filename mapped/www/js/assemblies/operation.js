export function load() {
  let gx=`
<sbadmin-content-page golgi:hook="operation">
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="Operation Settings" />
    <sbadmin-card-body>
      <sbadmin-form golgi:ref="form">
        <fieldset>
          <sbadmin-input type="text" name="alwaysUseSlotPrice" label="Always Use Slot Price:" placeholder="Numeric value" />
          <sbadmin-input type="text" name="movingAveragePeriod" label="Number of days for which averages will be calculated:" placeholder="Numeric (integer) value" />
          <sbadmin-button color="green" text="Save Changes" golgi:ref="saveBtn" />
        </fieldset>
      </sbadmin-form>

      <sbadmin-spacer />

      <sbadmin-form golgi:ref="enableform">
        <fieldset>
          <sbadmin-checkbox-group name="enableCharging" switch="true" value="yes" offValue="no" label="Enable Charging" title="Charging and Discharging:" golgi:ref="enableCharging" />
        </fieldset>
      </sbadmin-form>

    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-content-page': {
      operation: function() {
        let _this = this;
        let chargingEnabled;
        this.on('selected', async function() {

          // fetch the current values

          let url = '/agility/config/operation';
          let json = await _this.context.request(url);
          if (json.error) {
            _this.toast.headerTxt = 'Error';
            _this.toast.display(json.error);
          }
          else {
            for (let name in json.data) {
              if (name !== 'chargingEnabled') {
                _this.form.fieldsByName.get(name).value = json.data[name];
              }
            }
          }

          // see if charging is enabled

          json = await _this.context.request('/agility/charging/isEnabled');
          if (json.error) {
            _this.toast.headerTxt = 'Error';
            _this.toast.display(json.error);
          }
          if (json.enabled) {
            _this.enableCharging.cb.check();
            chargingEnabled = true;
          }
          else {
            _this.enableCharging.cb.uncheck();
            chargingEnabled = false;
          }

          _this.saveBtn.on('clicked', async () => {

            let body = {};
            for (let [name, field] of _this.form.fieldsByName) {
              body[name] = field.value;
            }

            let json = await _this.context.request('/agility/config/operation', 'POST', body);
            if (json.error) {
              _this.toast.headerTxt = 'Error';
              _this.toast.display(json.error);
            }
            else {
              _this.toast.headerTxt = 'Success!';
              _this.toast.display('Update was successful');
            }
          });

          _this.enableCharging.cb.on('clicked', async function() {
            console.log(111111);
            let json;
            if (chargingEnabled && _this.enableCharging.cb.checked) return;
            if (!chargingEnabled && !_this.enableCharging.cb.checked) return;
            if (_this.enableCharging.cb.checked) {
              json = await _this.context.request('/agility/charging/enable');
              if (json.error) {
                _this.toast.headerTxt = 'Error';
                _this.toast.display(json.error);
              }
              else {
                _this.toast.headerTxt = 'Success!';
                _this.toast.display('Agility will now charge your batteries');
                chargingEnabled = true;
              }
            }
            else {
              json = await _this.context.request('/agility/charging/disable');
              if (json.error) {
                _this.toast.headerTxt = 'Error';
                _this.toast.display(json.error);
              }
              else {
                _this.toast.headerTxt = 'Attention!';
                _this.toast.display('Agility will no longer charge your batteries');
                chargingEnabled = false;
              }
            }
          });
        });
      }
    }
  };

  return {gx, hooks};
};