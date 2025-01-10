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
          <sbadmin-checkbox-group name="enableCharging" switch="true" scale="1.8" value="yes" offValue="no" label=" : Enable Charging" title="Charging and Discharging:" golgi:ref="enableCharging" golgi:hook="charging" />
          <sbadmin-spacer /> 
          <sbadmin-checkbox-group name="enableClockSync" switch="true" scale="1.8" value="yes" offValue="no" label=" : Enable Synchronisation" title="Inverter Clock Synchronisation:" golgi:ref="enableClockSync" golgi:hook="clock" />

        </fieldset>
      </sbadmin-form>

    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-checkbox-group': {
      charging: function() {
        let _this = this;
        this.on('cbReady', async function(cb) {
          // see if charging is enabled
          let contentPage = _this.getParentComponent('sbadmin-content-page');

          let json = await _this.context.request('/agility/charging/isEnabled');
          if (json.error) {
            contentPage.toast.headerTxt = 'Error';
            contentPage.toast.display(json.error);
          }
          if (json.enabled) {
            cb.check();
          }
          else {
            cb.uncheck();
          }

          cb.on('clicked', async function() {
            let json;
            if (cb.checked) {
              json = await _this.context.request('/agility/charging/enable');
              if (json.error) {
                contentPage.toast.headerTxt = 'Error';
                contentPage.toast.display(json.error);
                cb.uncheck();
              }
              else {
                contentPage.toast.headerTxt = 'Success!';
                contentPage.toast.display('Agility will now charge your batteries');
              }
            }
            else {
              json = await _this.context.request('/agility/charging/disable');
              if (json.error) {
                contentPage.toast.headerTxt = 'Error';
                contentPage.toast.display(json.error);
              }
              else {
                contentPage.toast.headerTxt = 'Attention!';
                contentPage.toast.display('Agility will no longer charge your batteries');
              }
            }
          });
        });
      },
      clock: function() {
        let _this = this;
        this.on('cbReady', async function(cb) {
          // see if charging is enabled
          let contentPage = _this.getParentComponent('sbadmin-content-page');

          let json = await _this.context.request('/agility/clockSync/isEnabled');
          if (json.error) {
            contentPage.toast.headerTxt = 'Error';
            contentPage.toast.display(json.error);
          }
          if (json.enabled) {
            cb.check();
          }
          else {
            cb.uncheck();
          }

          cb.on('clicked', async function() {
            let json;
            if (cb.checked) {
              json = await _this.context.request('/agility/clockSync/enable');
              if (json.error) {
                contentPage.toast.headerTxt = 'Error';
                contentPage.toast.display(json.error);
                cb.uncheck();
              }
              else {
                contentPage.toast.headerTxt = 'Success!';
                contentPage.toast.display('Agility will now synchronise your inverter clock every midnight');
              }
            }
            else {
              json = await _this.context.request('/agility/clockSync/disable');
              if (json.error) {
                contentPage.toast.headerTxt = 'Error';
                contentPage.toast.display(json.error);
              }
              else {
                contentPage.toast.headerTxt = 'Attention!';
                contentPage.toast.display('Agility will no longer synchronise your inverter clock');
              }
            }
          });

        });
      }

    },
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
            if (json.data.alwaysUseSlotPrice) _this.form.fieldsByName.get('alwaysUseSlotPrice').value = json.data.alwaysUseSlotPrice;
            if (json.data.movingAveragePeriod) _this.form.fieldsByName.get('movingAveragePeriod').value = json.data.movingAveragePeriod;
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

        });
      }
    }
  };

  return {gx, hooks};
};