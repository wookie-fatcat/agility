export function load() {
  let gx=`
<sbadmin-content-page golgi:hook="history">
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="Your Power Usage History" />
    <sbadmin-card-body>
      <sbadmin-form golgi:ref="form">
        <sbadmin-select name="availableDates" label="Select a Date" golgi:ref="dateSelect" golgi:hook="dateSelected"/>
      </sbadmin-form>

      <canvas golgi:ref="useHistoryChart" />

      <sbadmin-modal golgi:ref="modal" />

    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-content-page': {
      history: function() {
        let _this = this;

document.addEventListener('touchend', function (event) {
  if (event.target && event.target.tagName.toLowerCase() !== "canvas") {
    CHART_INSTANCE.canvas.dispatchEvent(new Event('mouseout'));
  }
});

        this.fetchHistory = async function(dateIndex) {
          let json = await _this.context.request('/agility/solis/data/history/' + dateIndex);
          if (json.error) {
            _this.toast.headerTxt = 'Error';
            _this.toast.display(json.error);
          }
          else {
            let labels = [];
            let batteryLevels = [];
            let prices = [];
            let gridImports = [];
            let pvs = [];
            for (let record of json.history) {
              labels.push(record.time);
              batteryLevels.push(record.batteryLevel);
              gridImports.push(record.gridImportTotal);
              pvs.push(record.pvOutputTotal);
              prices.push(record.price);
            }


            let data = {
              labels: labels,
              datasets: [
                {
                  label: 'Battery Level (%)',
                  data: batteryLevels,
                  fill: false,
                  borderColor: 'red',
                  tension: 0.2,
                  yAxisID: 'battery'
                },
                {
                  label: 'Price (p)',
                  data: prices,
                  fill: false,
                  borderColor: 'blue',
                  stepped: 'middle',
                  yAxisID: 'price'
                },
                {
                  label: 'Grid Import (kWh)',
                  data: gridImports,
                  fill: true,
                  borderColor: 'green',
                  stepped: 'after',
                  yAxisID: 'gridImports'
                },
                {
                  label: 'PV Output (kWh)',
                  data: pvs,
                  fill: false,
                  borderColor: 'orange',
                  tension: 0.2,
                  yAxisID: 'pv'
                }
              ]
            };

            let config = {
              type: 'line',
              data: data,
              options: {
                interaction: {
                  intersect: false,
                  mode: 'index',
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      afterBody:  function(tooltipItems) {
                        let slot = tooltipItems[0].label;
                        let decision = json.chargeDecisionHistory[slot];
                        let lines = [];
                        let until = 'until 22:30 today: ';
                        if (decision.untilTomorrow) until = 'until 22:30 tomorrow: ';
                        let load = +decision.solis.load;
                        lines.push('Expected load ' + until + load.toFixed(2) + ' kWh');
                        let pv = +decision.solis.pv;
                        if (decision.solcast) pv = +decision.solcast.adjustedPrediction;
                        lines.push('Predicted PV ' + until + pv.toFixed(2) + ' kWh');
                        let deficit = +decision.deficit;
                        if (deficit < 0) {
                          deficit = 0 - deficit;
                          lines.push('Power surplus ' + until + deficit.toFixed(2) + ' kWh');
                        }
                        else {
                          lines.push('Power deficit ' + until + deficit.toFixed(2) + ' kWh');
                        }
                        if (decision.chargingDecision.charge) {
                          if (decision.chargingDecision.charge === 'charge') lines.push('Charging from Grid');
                          if (decision.chargingDecision.charge === 'gridonly') lines.push('Using Grid Power but not charging');
                        }
                        lines.push(decision.chargingDecision.reason);
                        return lines;
                      }
                    }
                  }
                },
                scales: {
                  battery: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: 0,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Battery (%)'
                    }
                  },
                  price: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                      display: true,
                      text: 'Price (p)'
                    }
                  },
                  gridImports: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                      display: true,
                      text: 'Grid Import (kWh)'
                    }
                  },
                  pv: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    max: 3,
                    min: 0,
                    title: {
                      display: true,
                      text: 'PV Output (kWh)'
                    }
                  }
                }
              }
            };  

            if (_this.context.useHistoryChart) _this.context.useHistoryChart.destroy();
            _this.context.useHistoryChart= new _this.context.Chart(_this.useHistoryChart, config);
          }
        };

        this.on('selected', async function() {
          let json = await _this.context.request('/agility/solis/data/availableDates');
          if (json.error) {
            _this.toast.headerTxt = 'Error';
            _this.toast.display(json.error);
          }
          else {
            let options = [];
            for (let obj of json.dates) {
              options.push({
                text: obj.date,
                value: obj.dateIndex
              });
            }
            _this.dateSelect.options = options;
            await _this.fetchHistory(json.dates[0].dateIndex);
          }
        });

      }
    },
    'sbadmin-select': {
      dateSelected: function() {
        let contentPage = this.getParentComponent('sbadmin-content-page');
        this.form.on('changed', async function(select) {
          await contentPage.fetchHistory(select.value);
        });
      }
    }
  };

  return {gx, hooks};
};
