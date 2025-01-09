export function load() {
  let gx=`
<sbadmin-content-page golgi:hook="solcast">
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="Solcast Credentials" />
    <sbadmin-card-body>
      <sbadmin-form golgi:ref="form">
        <fieldset>
          <sbadmin-input type="text" name="key" label="Your Solcast API Key:" placeholder="As provided by Solcast" golgi:ref="key" />
          <sbadmin-input type="text" name="endpoint" label="Your Solcast Endpoint URL" golgi:ref="endpoint" />
          <sbadmin-button color="green" text="Save Changes" golgi:ref="saveBtn" />
        </fieldset>
      </sbadmin-form>

      <sbadmin-spacer />

      <sbadmin-form golgi:ref="enabledform">
        <fieldset>
          <sbadmin-checkbox-group name="enable" switch="true" value="yes" offValue="no" label="Enable" title="Solcast Status:" golgi:ref="enabled" />
        </fieldset>
      </sbadmin-form>

    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-content-page': {
      solcast: function() {
        let _this = this;
        let enabled;
        this.on('selected', async function() {

          // fetch the current values

          let json = await _this.context.request('/agility/config/solcast');
          if (json.error) {
            _this.toast.headerTxt = 'Error';
            _this.toast.display(json.error);
          }
          else {
            _this.key.value = json.data.key;
            _this.endpoint.value = json.data.endpoint;
          }

          // see if solcast is enabled

          json = await _this.context.request('/agility/solcast/isenabled');
          if (json.error) {
            _this.toast.headerTxt = 'Error';
            _this.toast.display(json.error);
          }
          else {
            if (!json.configured) {
              _this.enabled.rootElement.style.display = 'none';
            }
            else {
              _this.enabled.rootElement.style.display = '';
              if (json.enabled) {
                _this.enabled.checkboxes[0].check();
                enabled = true;
              }
              else {
                _this.enabled.checkboxes[0].uncheck();
                enabled = false;
              }
            }
          }

          _this.saveBtn.on('clicked', async () => {

            let body = {};
            for (let [name, field] of _this.form.fieldsByName) {
              body[name] = field.value;
            }

            let json = await _this.context.request('/agility/config/solcast', 'POST', body);
            if (json.error) {
              _this.toast.headerTxt = 'Error';
              _this.toast.display(json.error);
            }
            else {
              _this.toast.headerTxt = 'Success!';
              _this.toast.display('Update was successful');
              _this.enabled.rootElement.style.display = '';
            }
          });

          _this.enabled.cb.on('clicked', async function() {
            let json;
            console.log('enabled: ' + enabled);
            console.log('checked: ' + _this.enabled.cb.checked);
            if (enabled && _this.enabled.cb.checked) return;
            if (!enabled && !_this.enabled.cb.checked) return;
            if (_this.enabled.cb.checked) {
              json = await _this.context.request('/agility/solcast/enable');
              if (json.error) {
                _this.toast.headerTxt = 'Error';
                _this.toast.display(json.error);
              }
              else {
                _this.toast.headerTxt = 'Success!';
                _this.toast.display('Agility will now use Solcast predictions');
                enabled = true;
              }
            }
            else {
              json = await _this.context.request('/agility/solcast/disable');
              if (json.error) {
                _this.toast.headerTxt = 'Error';
                _this.toast.display(json.error);
              }
              else {
                _this.toast.headerTxt = 'Attention!';
                _this.toast.display('Agility will no longer use Solcast predictions');
                enabled = false;
              }
            }
          });
        });
      }
    }
  };

  return {gx, hooks};
};