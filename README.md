# Agility: Automated Optimisation of the Octopus Agile Tariff on Solis Solar Systems

## NOTE: UNDER TESTING. FEEL FREE TO TRY IT OUT


## What is Agility?

Agility is a software application that can be run on pretty much any computer, including a Raspberry Pi.

Agility is designed for use with Solar and Battery systems, and aims to reduce your electricity bill 
by automatically selecting the cheapest times from the Octopus Agile tariff and using them to charge your 
solar batteries, using Agility's expectations of how much grid power you need to augment your solar
generation.

Agility is designed for use with Solar and Battery systems that use a [Solis](https://www.solisinverters.com/uk) Hybrid Inverter.
It has been tested using my own domestic Solis Inverter and [PylonTech](https://en.pylontech.com.cn/products/us5000) 
batteries, but should work with any other
battery systems where the Solis Inverter is responsible for and controls charging and discharging of 
the batteries.  Unfortunately if you use any other inverter for your solar system, Agility isn't for you.

Agility is written in JavaScript and runs using either [Node.js](https://nodejs.org) or 
[Bun.js](https://bun.sh).  However, it makes use of a [Docker](https://www.docker.com) Container
that we provide, and this looks after the entire run-time environment for you.  So provided you
have Docker installed on your computer, that's all you should need to worry about!  

Ideally though, we'd recommend running it on either:

- a Linux-based computer such as a [Raspberry Pi](https://www.raspberrypi.com/) on your own home network
- a Linux virtual machine running on a Windows or Mac computer on your home network
- an external cloud-based Linux virtual server to which you have full access

## Getting Started

First, read the [Checklist](./CHECKLIST.md) document to ensure you have everything needed to use and run Agility.

If all is OK, follow the [instructions for installing on a Raspberry Pi](./PI_INSTALL.md).

If you are trying to install Agility on another technology or platform, modify the instructions appropriately.


## The Octopus Agile Tariff

Agility is designed to automatically optimise use of the Octopus Agile electricity tariff.  This is a 
highly dynamic tariff from the UK energy provider, [Octopus](https://octopus.energy/).  
Unlike other tariffs, in the [Agile Tariff](https://octopus.energy/smart/agile/) 
the price of electricity varies every half-hour throughout the day, based on actual wholesale
electricity prices.  Typically there are 
very cheap half-hour slots during the night but also sometimes during other times of the day or evening.
Occasionally, primarily if there's a lot of windy weather, some slots are priced negatively, and
you're actually paid for any electricity you use during that slot!

The Agile Tariff isn't all upsides: during the peak UK electrictity usage period between 
16:00 and 19:00 the slots become extremely expensive, but Agility will try to ensure you don't fall
foul of them!  Occasionally there will be days when even the lowest priced slots are quite high, but 
even these are rarely as high as the Ofgem cap price.

The pricing of each Agile half-hour slot will differ from day to day.  The highly variable nature of
the Agile tariff makes it very difficult to use effectively without automation,but with the aid of
automation, such as provided by Agilty, it's possible to "game" the tariff to make significant savings.

Octopus releases
the next day's Agile tariff pricing at around 16:00 each day.  Agility will automatically fetch and use this new tariff
table as soon as Octopus makes it available.

Agility is primarily designed to save you money during the late Autumn, Winter and early Spring months
when your solar panels are typically generating less power than you consume each day and therefore you
need to rely on the grid for some or most of your power.  It does this by automatically and dynamically
identifying how much grid power you need throughout the day and night, identifying the cheapest Octopus
Agile tariff slots to use to provide that power, and instructing your Solis Inverter to force-charge
your battery from the grid during those cheapest slot periods.  As a result, the vast 
majority of your household power needs will be provided from what's stored in your batteries rather than
being supplied directly from the grid.

However there are sometimes savings to be made even during summer months.  Agility allows you to set a
price below which a slot is always used to charge your battery (unless it's already full). Agility defaults 
this price at 10p/kWh.  On summer days,if such very low-priced slots become available, Agility will use them to
fill up the battery, which means that when the sun rises, your system will begin exporting sooner than usual.
By using the Octopus export tariff that pays 15p/kWh, you'll effectively make at least 5p/kWh on any low-cost slot that was used.

Essentially Agility allows you to buy electricity at a low price and potentially sell any surplus back to the grid
later at a higher price.

Unlike other systems for optimising use of the Octopus Agile tariff, Agility is completely automatic.
Once started you should be able to leave it to optimise everything for you behind the scenes.  Agility
is designed to be resilient: it automatically and cleanly handles any API failures, which can occur 
particularly with SolisCloud, and re-issues the API calls if necessary until they are handled successfully.

Whilst it's still advisable
to try to avoid doing anything during the 16:00 to 19:00 peak period that consumes large amounts of power,
it's not essential.  The idea of Agility is that you don't need to fit your behaviour and power use around the Agile
tariff: Agility will learn and adapt to the profile of your typical daily power usage, and make its decisions
about when and how much battery charging is required to meet that power usage pattern so that you almost always
have sufficient power in your batteries to meet your needs, charged up at the cheapest possible times.

It's still interesting to check what Agility has done and the decisions it's made using your 
[SolisCloud](https://www.solisinverters.com/global/accessories6/SolisCloud.html) App and
see the amount of power you've consumed each day and how much (or little!) it's cost on the Octopus App.  It's
actually rather addictive!


## How Much Does Agility Cost?

Nothing!  I've made it available free of charge as what's known as an Open Source product.

You're free to download it and use it as much and for as long as you wish.

## How Much Money Will Agility Save Me?

That's impossible to predict.  It will depend on a number of factors:

- the size of your solar system: ie how much power your panels can generate
- the amount of battery storage
- the amount of electricity you typically consume each day
- the weather:
  - it affects the Octopus Agile tariff prices (they're typically cheapest when its windy or stormy)
  - it also, of course, affects how much power your solar panels will generate
- the time of year.  In the UK, a solar system will generate approximately 10 times in high Summer what it generates in the depths of Winter!

I'd recommend that you have sufficient battery storage to cover at least a third to a half of your 
typical daily power needs.  Basically the more battery storage you can afford the better.  The good
news is that battery storage continues to fall in price, and there's no VAT on domestic batteries.

The more power you typically use, the more Agile slots you'll need to charge your batteries, so you'll
begin to need to use more expensive slots.  So if you're also charging an EV and running a heat pump,
your potential savings may be less than if you consume at or below the UK average of 7kWh per day.

So I can't make any guarantees, but over the last year, by way of example, I've seen my average price
for electrictity to be around 12p/kWh - about half the Ofgem capped price.  

To put that into context, I don't have an EV or Heat Pump,
but we're an above-average power consumer.  I have sufficient battery storage for between 75% and 100% of
our daily needs and I have a fairly large (6kW peak) solar array.

## Warranty and Liabilities

You'll see a copy of the Open Source license at the end of this Readme document.  You'll notice that
no warranty is provided under the terms of the license: you use Agility entirely at your own risk.

However, I use the exact same software myself 24 X 7 to manage my own Solar system, so I believe it should
be safe and reliable for others to use, provided it is set up and used correctly.

## Technical Support

No technical support is provided for Agility.  

If you know about Github, then you can raise issues here
but I'm under no obligation to fix or troubleshoot issues that you come across or report.

Users of Agility are encouraged to join and use the following Facebook Groups to discuss its use and
for help with any issues:

  [Octopus Energy Automations Unofficial (Batteries / Solar / Home Assistant)](https://www.facebook.com/groups/octopusenergyautomations/)   
<br />

  [Solis Solar Inverter Owners Group](https://www.facebook.com/groups/288045168816481/)

I'll be monitoring these Facebook Groups from time to time and will assist whenever practical.

## Updates

Updates to the Agility software will be made available from time to time via this Github repository.

It's worth checking here occasionally for updates.

An update procedure for Agility will be added in due course.

----

## Prerequisites for Running Agility

- As described above, you need a Solar and Battery system based around a Solis Inverter
- Your Solis system needs to be registered to use the SolisCloud system and associate Apps.
Your installer should have already done this for you.

- You need to use Octopus as your power supplier and sign up to use their Octopus Agile tariff.

  If you aren't currently an Octopus customer, please use this referal link:

  [https://share.octopus.energy/lemon-crick-638](https://share.octopus.energy/lemon-crick-638)

  In doing so, you'll get a £50 initial discount off your first bill, and I'll also receive a £50 rebate which helps
  me to maintain and develop the Agility system!

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

  These steps are needed to allow Agility to send the signals across the Internet, via the SolisCloud system, 
  that tell your when to charge your batteries.  By default, Solis don't automatically allow access
  to its APIs, and, to be honest, they make it a bit of a pain to do so.  Fortunately it's a one-off process, and once
  set up, it should all be plain sailing from then on.  

  Unlike other solutions for automating Solis systems, there's no physical changes you need
  to make to your inverter set-up: Agility does everything by using SolisCloud's official APIs.

- Needless to say, the computer on which you run Agility needs access to the Internet in order to 
send those APIs to the SolisCloud server.

- In order to improve the accuracy of the predictions made by Agility in terms of how much grid power you
need at any time of the day, you can optionally make use of the excellent [Solcast](https://solcast.com/) system.  Solcast offer a
free tier of service for domestic users, which provides enough information to allow Agility to make much
more accurate predictions about how much or how little solar power your system will provide in the hours
ahead.  This helps to ensure that Agility doesn't unnecessarily purchase more grid power than you need on sunny days, 
but also ensures that Agility purchases any additional power to cover your needs on cloudy and gloomy days.

  Using Solcast is optional but recommended: it's pretty straightforward to set up an account and specify
the specific details of your system so that they can provide the daily predictions (which are more
often than not uncannily accurate!). 

  If you opt not to use Solcast, then Agility will still make predictions, but
it uses a moving average of your daily solar output that is derived from the SolisCloud data for your system.
Using this information may occasionally result in Agility charging your batteries more than needed (if
it's an unusually sunny day), or
failing to charge your batteries sufficiently (if it's an unusually gloomy day), in which case they may run out prematurely and you 
may begin to directly use grid power, potentially during a high-priced slot.

----

## License

 Copyright (c) 2024 MGateway Ltd,                           
 Redhill, Surrey UK.                                                      
 All rights reserved.                                                     
                                                                           
  https://www.mgateway.com                                                  
  Email: rtweed@mgateway.com                                               
                                                                           
                                                                           
  Licensed under the Apache License, Version 2.0 (the "License");          
  you may not use this file except in compliance with the License.         
  You may obtain a copy of the License at                                  
                                                                           
      http://www.apache.org/licenses/LICENSE-2.0                           
                                                                           
  Unless required by applicable law or agreed to in writing, software      
  distributed under the License is distributed on an "AS IS" BASIS,        
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
  See the License for the specific language governing permissions and      
   limitations under the License. 

