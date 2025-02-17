# Checklist of Things To Do/Check Before Starting Agility

- You must reside in the UK (excluding N Ireland where, unfortunately, Octopus is not a supplier)

- Your Inverter must be a Solis Hybrid Inverter with attached battery storage

  - additionally, currently your inverter must use an S3-Wifi Data Logger.

  - charging and discharging your batteries must be controlled by the Solis Inverter.  Check with 
your installer if in doubt

  - you'll need to find out your maximum battery storage capacity in kWh

- Your Solis system needs to be registered to use the SolisCloud system and its associate Apps.
Your installer should have already done this for you.

- Check your Solis inverter time zone settings

  - it should be set to UK/Europe (+00)

- You can use Agility with any tariff from any supplier (apart from Octopus *Intelligent* ones).

  Agility was originally designed to operate against the Octopus Agile tariff, and when its prices
are right, it's a great tariff to use.

  If you decide to use an Octopus tariff, but you aren't currently an Octopus customer, you can use this referal link:

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

- Before starting Agility, we recommend that you run the tests that are provided in the Web Interface Configuration
panels.





 