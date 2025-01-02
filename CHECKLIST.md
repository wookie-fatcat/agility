# Checklist of Things To Do/Check Before Starting Agility

- You must reside in the UK

- Your Inverter must be a Solis Hybrid Inverter with attached battery storage

  - charging and discharging your batteries must be controlled by the Solis Inverter.  Check with 
your installer if in doubt

  - you'll need to find out your maximum battery storage capacity in kWh

- Your Solis system needs to be registered to use the SolisCloud system and its associate Apps.
Your installer should have already done this for you.

- Check your Solis inverter time zone settings

  - it should be set to UK/Europe (+00)

- You need to use Octopus as your power supplier and sign up to use their Octopus Agile tariff.

  If you aren't currently an Octopus customer, you can use this referal link:

  [https://share.octopus.energy/lemon-crick-638](https://share.octopus.energy/lemon-crick-638)

- You need to contact Solis technical support to do two key things:

  - activate remote access to your Inverter
  - get authorisation to use their official remote control APIs.  As part of this step, you'll be able to obtain an API key and secret
 which are needed by Agility to control your inverter.

  Here's what you need to do:

  - Submit a [service ticket](https://solis-service.solisinverters.com/support/solutions/articles/44002212561-api-access-soliscloud) and wait until you get their response.
  - Next, go to [https://www.soliscloud.com/#/apiManage](https://www.soliscloud.com/#/apiManage).
  - Activate API management and agree with the usage conditions.
  - After activation, click on *View Key". A pop-up window window will appear asking for the verification code.
  - First click on *Verification code*.  You will get an image with 2 puzzle pieces, 
which you need to overlap each other using the slider below.
  - You should receive an email with the required verification code
  - Once confirmed, you will get your API key, secret and API URL

- If you want to use the optional Solcast integration, go to their [website](https://solcast.com) and:

  - set up a subscription using their free personal/domestic tier
  - configure your solar system settings
  - obtain your specific endpoint URL and API key

- Follow the [installation instructions for Agility](./PI_INSTALL.md)

  Note: If you want to use Solcast, add the following to the *config.json* file:

```console
  "solcast": {
    "key": "--enter your API key here--",
    "endpoint": "https://api.solcast.com.au/rooftop_sites/xxxxxxxxxx/forecasts?format=json"
  }
```
  Edit in your Solcast key and your site-specific endpoint.

Your *config.json* file should then look something like this:

```console
{
  "solisCloud": {
    "key": "xxxxxxxxxx",
    "secret": "yyyyyyyyy",
    "endpoint": "https://www.soliscloud.com:13333",
    "customerId": "zzzzzzzzz",
    "inverterSn": "99999999"
  },
  "octopus": {
    "zone": "J",
    "url1": "https://api.octopus.energy/v1/products/AGILE-23-12-06/electricity-tariffs/E-1R-AGILE-23-12-06-",
    "url2": "/standard-unit-rates/"
  },
  "battery": {
    "storage": 14,
    "minimumLevel": 20,
    "chargeLimit": 95,
    "chargeCurrent": 50,
    "dischargeCurrent": 50
  },
  "operation": {
    "movingAveragePeriod": 14,
    "alwaysUseSlotPrice": 10
  },
  "solcast": {
    "key": "yyyyyyyyyyy",
    "endpoint": "https://api.solcast.com.au/rooftop_sites/xxxxxxxxxx/forecasts?format=json"
  }
}
```

- Before starting Agility, run the following tests to make sure the key APIs are able to work correctly:

 (To be completed)




 