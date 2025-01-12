export function load() {
  let gx=`
<sbadmin-content-page>
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="Inverter Charge Control" />
    <sbadmin-card-body>
      <sbadmin-form golgi:ref="form">
        <fieldset>
          <sbadmin-card-text>Charge Inverter:</sbadmin-card-text>

          <sbadmin-input type="time" cls="w-40" name="fromTime" label="From:" />
          <br />
          <sbadmin-input type="time" cls="w-40" name="toTime" label="Until : " />
          <br />
          <sbadmin-button color="green" size="small" text="Charge" golgi:ref="chargeBtn" golgi:hook="chargeBetween" />
          <hr />

          <sbadmin-card-text>Charge Inverter from now until the end of the current slot</sbadmin-card-text>
          <sbadmin-button color="blue" size="small" text="Charge Now" golgi:ref="chargeNowBtn" golgi:hook="chargeNow" />

          <hr />
          <sbadmin-button color="orange" size="small" text="Cancel Charge" golgi:ref="cancelBtn" golgi:hook="cancel" />

        </fieldset>
      </sbadmin-form>

    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-button': {
      chargeBetween: function() {
        let _this = this;
        let form = this.getParentComponent('sbadmin-form');
        let contentPage = this.getParentComponent('sbadmin-content-page');
        this.on('clicked', async function() {
          let body = {
            fromTime: form.fieldsByName.get('fromTime').value,
            toTime: form.fieldsByName.get('toTime').value
          }
          let json = await _this.context.request('/agility/solis/inverterCharge', 'POST', body);
          if (json.error) {
            contentPage.toast.headerTxt = 'Error';
            contentPage.toast.display(json.error);
          }
          else {
            contentPage.toast.headerTxt = 'Success!';
            contentPage.toast.display(json.status);
          }
        });
      },
      chargeNow: function() {
        let _this = this;
        let contentPage = this.getParentComponent('sbadmin-content-page');
        this.on('clicked', async function() {
          let json = await _this.context.request('/agility/solis/inverterChargeNow');
          if (json.error) {
            contentPage.toast.headerTxt = 'Error';
            contentPage.toast.display(json.error);
          }
          else {
            contentPage.toast.headerTxt = 'Success!';
            contentPage.toast.display(json.status);
          }
        });
      },
      cancel: function() {
        let _this = this;
        let contentPage = this.getParentComponent('sbadmin-content-page');
        this.on('clicked', async function() {
          let json = await _this.context.request('/agility/solis/resetInverter');
          if (json.error) {
            contentPage.toast.headerTxt = 'Error';
            contentPage.toast.display(json.error);
          }
          else {
            contentPage.toast.headerTxt = 'Success!';
            contentPage.toast.display(json.status);
          }
        });
      }
    }
  };

  return {gx, hooks};
};