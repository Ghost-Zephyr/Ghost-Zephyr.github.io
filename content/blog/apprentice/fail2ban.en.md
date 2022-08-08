---
date: 2022-07-14T09:01:03Z
draft: false
aliases: []
categories: ['documentation']
series: ['apprentice', 'security']
tags: ['firewall', 'tech']
chroma: false
toc: true
title: Fail2ban
description: Fail2ban is a neat tool that makes it easy to watch logs and ban IP's that try to do malicious stuff to your servers.
---

At SkyLabs I had the surprisingly pleasant experience of configuring fail2ban for a bunch of production servers.
What fail2ban simply does is watch log files, match the lines against predefined regex patterns.
After a predefined amount of matches for a specific IP, it gets :hammer: banned.
The super cool thing about this is that the max retry, and most options may be set globally, but also locally for each "jail".
These jails are just configs for the filters.

Those filters are where the magic happens!
It's configs that describe the regex for matching log lines.

There is also the actions.
Actions describe shell commands for performing bans.
And extra stuff to also do when banning IPs.
