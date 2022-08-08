---
date: 2022-07-04T13:12:00Z
draft: false
aliases: []
categories: ['apprentice']
series: ['hacking', 'security']
tags: ['apprentice', 'tech', 'bug']
chroma: true
toc: true
title: Sircon
description: Security issues I found at Sircon AS. They were all fixed quickly by the responsible persons.
---

These guys have a few beefy ass physical servers in their own rack in a supposedly EMP and fire safe room in the basement of their offices.
Those physical machines run virtual machines that run WHM/cPanel and whatever PHP app the customer would like.
But >90% of their customers are non-technical and just only interact with the default WordPress setup and maybe the e-mail service that comes with their cPanel.
Most of the people calling in to their support line has problems using their e-mail, and it's usually the end user who fucked up.

## Servers
Have you ever used Apache httpd? Have you ever used its .htaccess config?
Well it's pretty cool, but may pose a threat on shared "web hotels" like WHM servers running a whole lot of cPanel accounts.
If using .htaccess is allowed users may set their own configuration options for httpd.

And the issue I identified here was the fact that cgi configuration options where allowed in .htaccess.
So I had some fun making wired cgi scripts in python, perl and bash.

The last thing I did before disclosing it to Sircon's server guy was to make a proof of concept script that gave me a shell on the server.
As they don't allow ssh access and PHP is configured to not allow anything dangerous, like the system() function, that would allow you to create shells.

Example .htaccess to run cgi scripts.

{{< highlight apache >}}{{% asset "apprentice/security/htaccess" %}}{{< /highlight >}}

The fix for this is the [AllowOverride](https://httpd.apache.org/docs/current/mod/core.html#allowoverride) directive.
Just make sure it does not include "FileInfo".

## WordPress
I found a bug on their homepage [sircon.no](https://sircon.no) where they have a simple WordPress shop with a couple of cool features, like [this](https://sircon.no/sjekk-om-din-nettbutikk-nettsted-driftes-miljovennlig/) where you supposedly can check how green a web page is. As in green energy.

The bug I found was missing server side validation and a shopping cart that's stored in the browsers local storage with price specified.
This is a pretty minor issue however, as they don't do automatic provisioning, and it only gets added to some internal webpage they use to keep track of everything.
But whatever you posted as the price would show up in that tool.
You could even post negative prices!
