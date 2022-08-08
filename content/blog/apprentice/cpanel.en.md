---
date: 2022-06-20T14:07:02Z
draft: false
aliases: []
categories: ['documentation']
series: ['apprentice', 'hosing']
tags: ['hosting', 'tech']
chroma: false
toc: true
title: cPanel
description: cPanel is a server interface provided by many hosting providers for web based management of the servers by their customers
---

I think anyone who uses cPanel should be aware of [WHM](../whm)/Web Host Manager.
Although cPanel may run completely on its own, but usually you find its running with WHM.
Meaning that whoever sells you the cPanel access sets it up through WHM.

Alone cPanel may be pretty powerful depending on what access you're granted.
Often hosting providers will limit you to only access the files of your web-root and settings for additional services like e-mail and DNS.
But cPanel may even allow for terminal access on the Linux host.
Because it's "shared hosting", usually anyway.
Meaning you run WHM on Linux box and setup cPanel accounts that are actual Linux users.
As WHM uses built-in Linux security for access control on the host.

cPanel is also capable of hosting all sorts of different types of web-apps.
Even though it's often configured to only allow PHP, where you'd likely see WordPress installs.
