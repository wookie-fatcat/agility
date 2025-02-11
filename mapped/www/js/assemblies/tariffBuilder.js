export function load() {
  let gx=`
<sbadmin-content-page golgi:hook="configure">
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="Custom Tariff Builder" />
    <sbadmin-card-body>
      <sbadmin-card-text>You can use Agility with most other tariffs, but you will need to define
                         your tariff's times and prices so that Agility can generate pseudo-Agile
                         prices each day at 4pm when requested.
      </sbadmin-card-text>
      <sbadmin-card-text>The Tariff Builder form below will allow you to create a custom tariff
                         table that Agility can use instead of the daily Octopus Agile tariff tables.
      </sbadmin-card-text>
      <hr />

      <sbadmin-form golgi:ref="form">
        <sbadmin-table cls="table-sm table-responsive" golgi:ref="table" />
        <sbadmin-button color="green" size="small" text="Save Tariff" golgi:ref="saveBtn" golgi:hook="saveTariff" />
        <sbadmin-spacer /> 
        <sbadmin-checkbox-group name="enableCustomTariff" switch="true" scale="1.8" value="yes" offValue="no" label=" : Enable Custom Tariff" title="Use Custom Tariff Instead of Octopus Agile:" golgi:ref="enableCustomTariff" golgi:hook="customTariff" />
      </sbadmin-form>

    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-content-page': {
      configure: function() {
        let _this = this;
        this.on('selected', async function() {
          let json = await _this.context.request('/agility/octopus/customTariff');
          if (json.error) {
            contentPage.toast.headerTxt = 'Error';
            contentPage.toast.display(json.error);
          }
          else {

            let table = {
              head: [
                {value: 'Hour'},
                {value: 'Price (p)'}
              ],
              body: []
            };
            for (let hour = 0; hour < 24; hour++) {
              let hrText = hour.toString();
              if (hour < 10) hrText = '0' + hrText;
              let value = 0;
              if (json.prices[hour]) {
                value = json.prices[hour].price;
              }
              table.body.push([{value: hrText}, {value: value, isInput: true, id: 'hr-' + hour}]);
            }
            _this.table.render(table);
          }

          _this.saveBtn.on('clicked', async function() {
            let prices = [];
            let inputs = [..._this.table.rootElement.querySelectorAll('input')];
            for (let input of inputs) {
              let hour = +input.id.split('hr-')[1];
              let price = +input.value;
              prices.push({hour: hour, price: price});
            }
            let body = {
              prices: prices
            }
            let json = await _this.context.request('/agility/octopus/customTariff', 'POST', body);
            if (json.error) {
              _this.toast.headerTxt = 'Error';
              _this.toast.display(json.error);
            }
            else {
              _this.toast.headerTxt = 'Success!';
              _this.toast.display('Your custom tariff table has been saved');
            }
          });

        });
      }
    },
    'sbadmin-checkbox-group': {
      customTariff: function() {
        let _this = this;
        this.on('cbReady', async function(cb) {
          // see if charging is enabled
          let contentPage = _this.getParentComponent('sbadmin-content-page');

          let json = await _this.context.request('/agility/octopus/isCustomTariffEnabled');
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
              json = await _this.context.request('/agility/octopus/enableCustomTariff');
              if (json.error) {
                contentPage.toast.headerTxt = 'Error';
                contentPage.toast.display(json.error);
                cb.uncheck();
              }
              else {
                contentPage.toast.headerTxt = 'Success!';
                contentPage.toast.display('Agility will now use your Custom Tariff instead of Octopus Agile');
              }
            }
            else {
              json = await _this.context.request('/agility/octopus/disableCustomTariff');
              if (json.error) {
                contentPage.toast.headerTxt = 'Error';
                contentPage.toast.display(json.error);
              }
              else {
                contentPage.toast.headerTxt = 'Attention!';
                contentPage.toast.display('Agility will no longer use your Custom Tariff');
              }
            }
          });
        });
      }
    }
  };

  return {gx, hooks};
};