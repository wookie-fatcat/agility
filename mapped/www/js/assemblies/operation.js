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
    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-content-page': {
      operation: function() {
        let _this = this;
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
              _this.form.fieldsByName.get(name).value = json.data[name];
            }
          }

          _this.saveBtn.on('clicked', async () => {
            let url = '/agility/config/operation';

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