export function load() {
  let gx=`
<sbadmin-content-page golgi:hook="configure">
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="Activity Log" />
    <sbadmin-card-body>
      <sbadmin-card-text golgi:ref="cardText">
      </sbadmin-card-text>
    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-content-page': {
      configure: function() {
        let source;
        let _this = this;
        let timer;
        let pid;
        this.on('selected', function() {
          _this.cardText.rootElement.style.height = (window.innerHeight - 250) + 'px';
          _this.cardText.rootElement.style.overflowY = 'scroll';
          if (source && source.readyState === 1) {
            source.close();
          }
          if (timer) {
            clearTimeout(timer);
          }
          source = new EventSource(window.location.protocol + "//" + window.location.host + '/agility/sse');
          source.onmessage = function(event) {
            if (event.data.startsWith('server_process:')) {
              pid = event.data.split('server_process:')[1];
            }
            else if (event.data !== 'keepalive') {
              let pre = document.createElement('pre');
              pre.textContent = event.data;
              _this.cardText.rootElement.appendChild(pre);
              _this.cardText.rootElement.scrollTop = _this.cardText.rootElement.scrollHeight;
            }
          };
          timer = setTimeout(async function() {
            // close it down to prevent any issues
            let json = await _this.context.request('/agility/closeSSE/' + pid);
            _this.toast.headerTxt = 'Warning!';
            _this.toast.display('Streaming disabled. Reselect Status Log menu option to restart');
            let pre = document.createElement('pre');
            pre.textContent = 'Streaming connection closed. Reselect Status Log menu option to restart';
            _this.cardText.rootElement.appendChild(pre);
            _this.cardText.rootElement.scrollTop = _this.cardText.rootElement.scrollHeight;
            source.close();
          }, 300000);
        });
      }
    }
  };

  return {gx, hooks};
};