---
date: 2022-06-07T07:14:28Z
draft: false
aliases: []
categories: ['documentation', 'networking']
series: ['apprentice']
tags: ['net', 'os']
toc: true
title: Meraki
description: Cisco Meraki basics and captive portal setup
---

Meraki is Cisco's cloud managed networking solution.
It has everything and more than what most people would need.
But of course me being me, I don't like my infrastructure being managed by cloud services.

I did however work a little with Meraki at SkyLabs, and was pleasantly surprised.
After having a couple very bad experiences with our Mikrotik setup script.
Setting up a Meraki access point with our captive portal service was super easy!

## Captive portal setup
As mentioned the captive portal setup on Meraki is relatively simple.
And with a little luck the only 100% necessary configuration options would be just a "splash page URL" and RADIUS.
And if the captive portal ain't responsible for authenticating people you could probably get away with just the splash page URL.
But RADIUS is needed for actual captive portal authentication.

### Access control
Even having a captive portal setup makes it incompatible with certain other options.
And I think Meraki is a bit excessive with the limitations here.

##### Network access
For the "Network access" you'd likely want it to be "Open", but if not.
PSK, aka normal password is your only option for adding additional auth requirements.

##### Splash page
Set security to; Sign-on with "my RADIUS server".

###### Advanced splash
In here there are a few options you may want to change that changes the behavior of the captive portal hot-spot.
Such as limiting users to being logged in with one device only.
If users are allowed through if the box/access point can't connect to Meraki Cloud.
The "Captive portal strength", this lets you allow non-HTTP traffic before captive portal login.
And last, but definitely not least.
The Walled garden, walled garden lets you have a list of allowed IPs that may be connected to before authorization.

##### RADIUS
For RADIUS you'll need the IP and RADIUS secret for the server.
Default RADIUS ports are 1812 for authentication and 1813 for RADIUS accounting.

### Other options
There is also a separate Meraki dashboard page specific for "Splash page" options.
In there you'd put your "Custom splash URL", although you may also manage a Meraki provided captive portal there.

## Caveats
One thing that's kinda annoying about Meraki however is its RADIUS client.
Meraki uses cloud based RADIUS clients, so from our side, we can only differentiate between them by the data that's sent.
This has caused us to add some extra limitations on Meraki setups using our captive portals.
Ain't too bad, but for RADIUS accounting to work it kinda gets ugly.
And we would need RADIUS accounting for our paid SMS login.
