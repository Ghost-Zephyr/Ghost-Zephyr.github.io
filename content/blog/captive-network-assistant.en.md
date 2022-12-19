---
date: 2022-12-15T15:10:59Z
aliases: []
categories: ['captive-portals', 'various']
series: ['apple']
tags: ['various', 'apple']
chroma: false
toc: true
title: Apple CNA (Captive Network Assistant)
description: The Apple "Captive Network Assistant" is some software running on Apple devices that checks if Wi-Fi networks have captive portal setups and potentially starts a sand-boxed browser to do the portal login.
---

Now I may be biased as I've had to work with captive portals and been annoyed by Apples sand-boxed captive network assistants web browser.
Apples CNA sandbox browser does not allow any sort of persistent storage on the device.
To the point where localStorage is outright disallowed and cookies are not stored between sessions.
It's also not allowed to open new windows/tabs as the browser only has the one window you get and won't allow any attempts to get out of the sandbox by opening a new window or open some app.

What's very curious however is the fact that most stack overflow questions about the Apples captive portal browser is about using Facebook as the authentication method which we ([Sky Labs](https://skylabs.no)) have had for a long time.
But where I finally had to face this pice of :poop: was with the Norwegian payment service called [Vipps](https://vipps.no).
For anyone not in the loop Vipps is like Norwegian Venmo/CashApp.
Although the whole selling point of Vipps is its "instant" payments.

The one single limitation of Apples CNA sandbox browser that throws a gigantic wrench into our Vipps integration is no opening of app links.
This causes it to be pretty finicky to login on the same device as one is trying to pay with.
So we expect end-users to get very annoyed and confused by this.

One alternative to get the users out of the sandbox browser is to preemptively give them full network access and send them to their normal browser to do the payment.
But we want to avoid that option as it would require RADIUS CoA (Change of Authorization) to be working for us to be able to kick out users that starts the payment process, but doesn't complete it.
And we're already having issues around this with our paid SMS authentication method.

If we're lucky enough to have Vipps help us, they could probably make it so that the app always send the user to our specified web page after payment.
Not just when waiting on the Vipps webpage for payment on another device or after having the app opened from an app link.

<!-- This tomfoolery -->
