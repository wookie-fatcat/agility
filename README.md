# Agility: Automated Optimisation of the Octopus Agile Tariff on Solis Solar Systems

## What is Agility?

Agility is a software application that can be run on pretty much any computer, including a Raspberry Pi.

Agility is designed for use with Solar and Battery systems that use a Solis Hybrid Inverter.
It has been tested using my own domestic Solis Inverter with PylonTech batteries, but should work with any other
battery systems where the Solis Inverter is responsible for and controls charging and discharging of 
the batteries.  Unfortunately if you use any other inverter for your solar system, Agility isn't for you.

Agility is written in JavaScript and runs using either Node.js or Bun.js.  However, it makes use of a Docker Container
that we provide, and this looks after the entire run-time environment for you.  So provided you
have Docker installed on your computer, that's all you should need to worry about!  

Ideally though, we'd recommend running it on either:

- a Linux-based computer such as a Raspberry Pi on your own home network
- a Linux virtual machine running on a Windows or Mac computer on your home network
- an external cloud-based Linux virtual server that you have full access to

Agility is designed to automatically optimise use of the Octopus Agile electricity tariff.  This is a 
highly dynamic tariff whereby the price varies every half-hour throughout the day.  Typically there are 
very cheap half-hour slots during the night but also sometimes during other times of the day or evening.
However, between the peak UK electrictity usage period between 16:00 and 19:00 the slots become
extremely expensive.  The pricing of each half-hour slot will differ from day to day.  Octopus releases
the next day's tariff pricing at around 16:00 each day.  Agility will automatically fetch this tariff
as soon as it becomes available.

Agility is primarily designed to save you money during the late Autumn, Winter and early Spring months
when your solar panels are typically generating less power than you consume each day and therefore you
need to rely on the grid for much or most of your power.  It does this by automatically and dynamically
identifying how much grid power you need throughout the day and night, identifying the cheapest Octopus
Agile tariff slots to use to provide that power, and instructing your Solis Inverter to force-charge
your battery from the grid during those cheapest slot periods.

Unlike other systems for optimising use of the Octopus Agile tariff, Agility is completely automatic.
Once started you should be able to leave it to optimise everything for you.  Whilst it's still advisable
to try to avoid doing anything during the 16:00 to 19:00 peak period that consumes large amounts of power,
it's not essential.  The idea of Agility is that you don't need to change your behaviour around the Agile
tariff: it will learn and adapt to the profile of your typical daily power usage, and make its decisions
about when and how much battery charging is required to meet that power usage pattern.

It's still interesting to check what Agility has done and the decisions it's made using your SolisCloud App and
see the amount of power you've consumed each day and how much (or little!) it's cost on the Octopus App.

## How Much Does Agility Cost?

Nothing!  I've made it available free of charge as what's known as an Open Source product.

You're free to download it and use it as much and for as long as you wish.

## Warranty and Liabilities

You'll see a copy of the Open Source license at the end of this Readme document.  You'll notice that
no warranty is provided: you use it entirely at your own risk.

However, I use the exact same software myself 24 X 7 to manage my own Solar system!

## Technical Support

No technical support is available for free.  If you know about Github, then you can raise issues here
but I'm under no obligation to fix or troubleshoot issues that you come across.

In future I'll probably set up a Facebook group for Agility users for self-help, discussions, 
suggestions etc.

----

## Prerequisites for Running Agility

- As described above, you need a Solar and Battery system based around a Solis Inverter
- Your Solis system needs to be registered to use the SolisCloud system and associate Apps
- You need to use Octopus as your power supplier and sign up to use their Octopus Agile tariff.

  If you aren't currently an Octopus customer, please use this referal link:

  [https://share.octopus.energy/lemon-crick-638](https://share.octopus.energy/lemon-crick-638)

  In doing so, you'll get a £50 initial discount off your first bill, and I'll also receive a £50 rebate which helps
  me to maintain and develop the Agility system!

- You need to contact Solis technical support to do two key things:

  - activate remote access to your Inverter
  - get authorisation to use their remote control APIs.  This requires you to sign a Non-Disclosure
    Agreement (NDA), which essentially waives any liabilities if your use of the APIs messes up your inverter.

  I've provided details later in this document on how you do these two key things.

  These steps are needed to allow Agility to send the signals across the Internet, via the SolisCloud system, 
  that tell your when to charge your batteries.  By default, Solis don't automatically allow access
  to its APIs, and they make it a bit of a pain to do so.  Fortunately it's a one-off process, and once
  set up, it should all be plain sailing.  Their NDA is a fairly daunting document, but I've not had
  any follow-up regarding it from Solis in the year I've been running and developing Agility for my
  own system.

  Unlike other solutions for automating Solis systems, there's no physical changes you otherwise need
  to make to your inverter set-up: Agility does everything by using SolisCloud's APIs.

- Needless to say, the computer on which you run Agility needs access to the Internet in order to 
send those APIs to the SolisCloud server.

- In order to improve the accuracy of the predictions made by Agility in terms of how much grid power you
need at any time of the day, you can optionally make use of the excellent Solcast system.  Solcast offer a
free tier of service for domestic users, which provides enough information to allow Agility to make much
more accurate predictions about how much or how little solar power your system will provide in the hours
ahead.  This helps to ensure that Agility doesn't unnecessarily purchase more grid power than you need on sunny days, 
but also ensures that Agility purchases any additional power to cover your needs on cloudy and gloomy days.

  Using Solcast is optional but recommended: it's pretty straightforward to set up an account and specify
the specific details of your system so that they can provide the daily predictions (which are more
often that not uncannily accurate!).  If you opt to not use Solcast, then Agility will make its predictions
using a moving average of your daily solar output that is derived from the SolisCloud data for your system.
