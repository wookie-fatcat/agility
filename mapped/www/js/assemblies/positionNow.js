export function load() {
  let gx=`
<sbadmin-content-page golgi:hook="positionNow">
  <sbadmin-spacer />
  <sbadmin-card bgColor="white" textColor="dark" widthStyle="60%" position="center">
    <sbadmin-card-header text="Power Analysis" />
    <sbadmin-card-body>

      <sbadmin-card-text>Agility's Analysis of your Current Net Power Requirements</sbadmin-card-text>
      <sbadmin-table cls="table-sm table-responsive" golgi:ref="table" />

    </sbadmin-card-body>
  </sbadmin-card>

  <sbadmin-toast golgi:ref="toast" />

</sbadmin-content-page>
  `;

  let hooks = {
    'sbadmin-content-page': {
      positionNow: function() {
        let _this = this;
        this.on('selected', async function() {

          let json = await _this.context.request('/agility/positionNow');
          if (json.error) {
            _this.toast.headerTxt = 'Error';
            _this.toast.display(json.error);
          }
          else {
            let until;
            if (json.untilTomorrow) {
              until = json.calculationCutoffTime + ' tomorrow';
            }
            else {
              until = json.calculationCutoffTime + ' today';
            }

            // render results in table
            let table = {
              body: []
            };
            
            function addRow(title, value, cls) {
              let row = [{value: title}, {value: value}]
              if (cls) row[1].cls = cls;
              table.body.push(row);
            }
            function addSpan(title, cls) {
              cls = cls || 'table-info';
              table.body.push([{cls: cls}, {value: title, span: 2}]);
            }


            addRow('Most Recent Slot start time', json.slot);
            addRow('Slot end time', until);
            addRow('Net Power Deficit', json.deficit.toFixed(2) + ' kWh', 'table-danger');
            addRow('Number of slots needed for battery charging', json.chargeSlotsNeeded, 'table-danger');
            addSpan('How was that calculated?', 'table-primary center-text');
            addSpan('Based on SolisCloud Data during ' + json.movingAveragePeriod + ' day window:', 'table-info center-text');
            addRow('Average Expected Power Usage', json.solis.load.toFixed(2) + ' kWh');
            addRow('Average Expected PV generation', json.solis.pv.toFixed(2) + ' kWh');
            if (json.solcast.enabled) {
              addSpan('Based on Solcast Today:', 'table-info center-text');
              addRow('Predicted total PV generation', json.solcast.prediction.toFixed(2) + ' kWh');
              addRow('Adjustment', json.solcast.adjustment.toFixed(2) + '%');
              addRow('Adjusted predicted PV', json.solcast.adjustedPrediction.toFixed(2) + ' kWh');
            }
            addSpan('Battery Status:', 'table-info center-text');
            let level = 0;
            if (json.battery.level) level = json.battery.level;
            addRow('Level Now', level + '%');
            let availablePower = 0;
            if (json.battery.availablePower) availablePower = json.battery.availablePower.toFixed(2);
            addRow('Available Power', availablePower + ' kWh');
            addRow('Level Increase per Charge Slot', json.battery.increasePerCharge.toFixed(2) + '%');
            addRow('which equates to', json.battery.powerAddedPerCharge.toFixed(2) + ' kWh');
            addRow('Slots needed to fully charge battery from current level', json.battery.noOfSlotsToFillBattery);

            _this.table.render(table);


          }

        });
      }
    }
  };

  return {gx, hooks};
};