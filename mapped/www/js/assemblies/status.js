export function load() {
  let gx=`
<sbadmin-content-page golgi:hook="isRunning">
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="Current Status" />
    <sbadmin-card-body>
      <sbadmin-form golgi:ref="form">
        <fieldset>
          <sbadmin-card-text golgi:ref="cardText" />
          <sbadmin-button color="green" text="Start Agility" golgi:ref="startBtn" />
          <sbadmin-button color="red" text="Stop Agility" golgi:ref="stopBtn" />
        </fieldset>

        <hr />
        <sbadmin-card-text>NGINX should be reloaded if you have updated Agility</sbadmin-card-text>
        <fieldset>
          <sbadmin-button color="blue" size="small" text="Reload NGINX WebServer" golgi:ref="nginxBtn" />
        </fieldset>

      </sbadmin-form>
    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-content-page': {
      isRunning: function() {

        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        let _this = this;
        this.on('selected', async function() {

          let root = _this.getParentComponent('sbadmin-root');
          let json = await _this.context.request('/agility/version');
          if (json.error) {
            _this.toast.headerTxt = 'Error';
            _this.toast.display(json.error);
          }
          else {
            root.brand.text = 'Agility v' + json.version;
          }

          _this.startBtn.hide();
          _this.stopBtn.hide();
          json = await _this.context.request('/agility/isRunning');
          if (json.isRunning) {
            _this.cardText.rootElement.textContent = 'Agility is Running';
            _this.startBtn.hide();
            _this.stopBtn.show();
          }
          else {
            _this.cardText.rootElement.textContent = 'Agility is Not Running';
            _this.startBtn.show();
            _this.stopBtn.hide();
          }
          _this.startBtn.on('clicked', async () => {
            _this.startBtn.hide();
            _this.toast.headerTxt = 'Attention!';
            _this.toast.display('Please wait while Agility starts...');
            _this.cardText.rootElement.textContent = 'Agility is Starting';

            let url = '/agility/start';
            let json = await _this.context.request(url);
            if (json.error) {
              _this.toast.headerTxt = 'Error';
              _this.toast.display(json.error);
            }
            else {
              _this.cardText.rootElement.textContent = 'Agility is Running';
              _this.startBtn.hide();
              _this.stopBtn.show();
            }
          });
          _this.stopBtn.on('clicked', async () => {
            _this.toast.headerTxt = 'Attention!';
            _this.toast.display('Please wait up to a minute...');
            _this.cardText.rootElement.textContent = 'Please Wait: Agility has been instructed to stop';
            _this.stopBtn.hide();

            let url = '/agility/stop';
            let json = await _this.context.request(url);
            if (json.error) {
              // timed out - check status in 10 seconds
              setTimeout(async function() {
                //_this.toast.headerTxt = 'Error';
                //_this.toast.display(json.error);

                let json = await _this.context.request('/agility/isRunning');
                if (json.isRunning) {
                  _this.cardText.rootElement.textContent = 'Agility is Running';
                  _this.startBtn.hide();
                  _this.stopBtn.show();
                }
                else {
                  _this.cardText.rootElement.textContent = 'Agility is Not Running';
                  _this.startBtn.show();
                  _this.stopBtn.hide();
                }
              }, 10000);
            }
            else {
              // poll every 5 seconds to see if stopped

              let stopped = false;
              do {
                let json = await _this.context.request('/agility/isRunning');
                if (!json.isRunning) {
                  _this.cardText.rootElement.textContent = 'Agility is Not Running';
                  _this.startBtn.show();
                  _this.stopBtn.hide();
                  stopped = true;
                }
                else {
                  await sleep(5000);
                }
              }
              while (!stopped)
            }
          });
          _this.nginxBtn.on('clicked', async () => {
            let json = await _this.context.request('/agility/nginx/reload');
            _this.toast.headerTxt = 'Warning!';
            _this.toast.display('NGINX instructed to reload');
          });
        });
      }
    }
  };

  return {gx, hooks};
};