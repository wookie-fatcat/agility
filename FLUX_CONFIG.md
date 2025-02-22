# Guide to Setting up the Octopus Flux Tariff on Agility

## Pre-requisites and Assumptions

This guide assumes you have read the main [Agility documentation](./README.md) and have followed the
[Agility Installation Guide](./PI_INSTALL.md)

This guide described how to configure Agility to use the Octopus Flux tariff, but its instructions should
be able to be adapted for any other tariff from any supplier where:

- the supplier *does not* take control of your system
- the tariff uses fixed time slots with associated fixed prices
- the tariff has periods of low prices whose use you want to optimise with Agility.

## The Octopus Flux Tariff

The [Octopus Flux Tariff](https://octopus.energy/smart/flux/) is one of Octopus' so-called *smart* tariffs and combines
both import and export of electricity.  It is designed for customers with solar and battery systems.  

It has a 3-hour window between 2am and 5am when import rates are around 15p/kWh, whilst imports for the 
rest of the day are around 25p/kWh, apart from the 4pm-7pm peak time when imports are around 36p/kWh.

Electricity export for most of the day is around 14p/kWh, but during the 4pm-7pm peak, that rises to around 28p/kWh.

This makes it an interesting alternative to Octopus Agile, particularly if/when wholesale rates are high.

Agility can be used to optimise use of the Flux tariff, aiming to meet most or all of your energy needs by charging your
batteries during the 2am-5am window, but also by taking into account your predicted domestic energy load and PV generation,
Agility will only use the grid power it believes you actually need, so it won't unecessarily over-charge your batteries
if it predicts you don't need that electricity.

If you decide to use the Octopus Flux tariff, but you aren't currently an Octopus customer, you can use this referal link:

[https://share.octopus.energy/lemon-crick-638](https://share.octopus.energy/lemon-crick-638)

In doing so, you'll get a £50 initial discount off your first bill, and I'll also receive a £50 rebate which helps
  me to maintain and develop the Agility system!

## Configuring the Flux Tariff

Once you have Agility's web interface up and running, select the *Configuration/Octopus/Custom Tariff Builder*
menu option.

### Prices

You'll see an empty table with a row representing each hour of the day.

In each of the rows, enter the Flux tariff price for your postcode in the corresponding field for each of the hours, eg:

- Hour 00: Price 25.6
- Hour 01: Price 25.6
- Hour 02: Price 15.36
- Hour 03: Price 15.36
- Hour 04: Price 15.36
- Hour 05: Price 25.6
- Hour 06: Price 25.6

etc

### Calculation Cutoff Time

In each row you'll also see a so-called *Radio Button* field under the heading *Calculation Cutoff Time*.  For the
Flux tariff I recommend you click the one in the *Hour 04* row.

What this does is to tell Agility to base its energy balance calculations from the current time up to that cutoff time.

By setting this to 4am, Agility will calculate your energy needs and balance throughout each day up to 4am the 
following morning.  At midnight, it will automatically move its calculation horizon to 4am the following day.

### Saving Your Flux Tariff Table

Click the *Save Tariff* button.


### Enabling Your Flux Tariff

Unless told otherwise, Agility assumes you're using the Octopus Agile Tariff.  

So, having saved your Flux Tariff table, tell Agility to use it instead by using the *Enable Custom Tariff* switch
that you'll find below the *Save Tariff* button.

Whenever you set this switch to Enabled/On, Agility will fetch the Tariff table details that it needs in order
to operate.  See later for how this works.


### Peak Export

The Flux tariff includes export pricing and offers a pretty good price for exports during the 4pm-7pm peak period.

You can instruct Agility to try to make use of this period and automatically export any surplus electricity by simply
clicking the *Enable Peak Time Export Control* swicth at the bottom of the Custom Tariff Builder page.

Once selected, at each 30-minute period during the 4pm-7pm peak, Agility will calculate your energy balance and 
if it determines that you have more than 1 slot's-worth of surplus charge in your batteries, it will instruct 
your inverter to discharge your batteries during that period.

Note that if you are using a different tariff that also has such favourable peak-period pricing, you can make use of
this facility too: it isn't limited to use with the Flux tariff, but note that Agility is hard-coded to apply
 this control during the 4pm - 7pm period only.



### Fetching Your Custom Tariff

Unlike the Octopus Agile tariff which is fetched using Octopus' own API, Agility generates the equivalent of an Agile
tariff table for you.  It does so every day at 4pm, exactly as if it was fetching the latest Octopus Agile Tariff table.
However, unlike the Octopus Agile tariff which ends at 22:30 each following day, Agility will generate a set of custom
tariff slots and prices up to your selected *Calculation Cutoff Time* two days ahead.  So in our case, at 4pm each day,
Agility will update its Flux tariff tables from:

- 4pm - midnight on the current day
- every half hour for the entire next day
- midnight - 4am (our selected Calculation Cutoff Time) for the day after that

This is all done automatically by Agility: all you need to do is create the Custom Tariff Table, save it and enable it
and Agility will look after everything else for you.

### Setting up Other Tariffs

If you are setting up a different tariff, consider carefully what would be the most appropriate *Calculation
Cutoff Time*.  Don't unduly worry about this: you can do it by trial and error over a period of days.  Agility
allows you to modify this time whenever you like and will change its subsequent calculations accordingly: just
go to the Custom Tariff Building table, click a different radio button in a different time row, and save the table again.


### How Agility Uses Your Custom Tariff

Agility generates a pseudo Agile tariff table, ie for 30 minute time-slots, based on the prices you entered for each
hour of the day.

It then operates identically to how it would have done if using the real Octopus Agile tariff tables.  The only key
difference is the calculation "horizon" time.  Future Octopus Agile tariff pricing beyond 22:30 each day is unknown
until 4pm each day, whereas your Custom Tariff's times and prices are entirely predictable, and you can decide when
to set the calculation "horizon" time to allow Agility to make best use of the tariff structure.

### Handling Saving Sessions

From time to time, Octopus will announce, often at short notice, Saving Sessions which encourage you to reduce your
energy usage during, typically an hour of the peak period between 4pm and 7pm, eg between 5:30pm and 6:30pm.

You can increase your returns during such periods by exporting excess from your battery: a negative flow of energy
from your meter counts as a saving.

if you have Peak Export enabled in Agility (see earlier), then Agility will automatically export any battery-stored
energy that it calculates is unnecessary to meet the needs until 4am the next day (the calculation cutoff).  It will
begin to do this at 4pm.  If a Saving Session doesn't start until 5:30pm, the risk is that by then you'll have no
available excess to export.

So Agility provides a way for you to temporarily customise the peak period which by default is set to
4pm - 7pm.  Take a look in the *Configuration / Operation* Menu option.  At the bottom of the page you'll
see a set of checkboxes that indicate the current peak hours: all should be normally checked.

If you unchecked the 4pm, 4:30pm and 5pm ones, then Agility will not begin its Peak Export calculations until
5:30pm if that's when the Saving Session begins.  You can then let Agility handle the rest, exporting what it can
during the Saving Session automatically for you (and beyond if it still detects a surplus).

At 7pm, Agility will automatically reset your Peak Hours to the full 4pm - 7pm period.

