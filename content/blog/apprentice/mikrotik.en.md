---
date: 2022-06-08T10:34:42Z
draft: false
aliases: []
categories: ['documentation', 'networking']
series: ['apprentice']
tags: ['net', 'os']
toc: true
title: Mikrotik
description: Mikrotik routers has a lot of wired stuff builtin, here is some of that
---

Mikrotik produces networking equipment and software.
In 2021, they were the 3rd largest and first private company to reach a value above 1B EUR in their home country Latvia.

While their RouterOS has a terrible track record of getting hacked.
It has a load of cool and useful features built right in.
And all those ROS devices that constantly get hacked do so because of known vulnerabilities that would have been patched if only the devices where being updated on a regular basis.

## SkyLabs Mikrotik misadventures
Since Mikrotiks are the most used and best supported equipment for our services.
I got to work a lot with them when I wasn't programming or managing servers.
So here is a collection of some problems I encountered along the way working with SkyLabs Mikrotik boxes.

### Status script
The one story of me messing up big time as an apprentice is related to this piece of :poop: Mikrotik script.
It works quite simple, it's supposed to run every 5 minutes, although I've seed boxes that used to run it every single minute until I came and updated the things.
For each time it runs it collects all sorts of information about the box that runs it and then reports it to our API.

The thing that went wrong tho is a perfect example of how unpredictable simple changes can be.
It was upgrading nginx from 1.18 to 1.22.
That caused requests not properly URL encoded to get a 400 response.
As you'd expect, right?
But, as it turned out these status scripts on all the boxes didn't do so...
And when all our servers run fail2ban it meant those boxes got IP banned.
Causing the whole captive portal to stop working on those affected.

Interestingly a whole partners setup was fine, and the reason was a slight difference in the script.
The way those boxes got their RouterOS version, it got just the number.
While the standard version of the script also got the "branch", stable/long-term/beta.

I had two drafts of solution scripts so that we could upgrade nginx.
The first one had an inline for loop that would URL encode the string for the URL path with all the parameters the script sends to the API.
The other one just passed all the parameters in the HTTP body instead of the HTTP head of the request.
Completely bypassing the need for URL encoding.

Of course the second option there is the best for several reasons.
But the biggest one for us would have to be the fact that hotspot name is passed.
And that would be user input.
Never trust it.

### Full disk problem
The built-in drive on the boxes may get filled up by hidden files...
There exists an official [fix_space.npk](https://www.mikrotik.com/download/share/fix_space.npk) package, but finding that was a little adventure in itself reading through old forum threads from 2018...
I also managed to mess up a SkyLabs box using that package.
Probably just because we did it remote.
It's kinda funny, actually.
That "fix_spacke.npk", if you look at it in a hex editor.
You'll see that it's got a crazy amount of null bytes, and the most interesting.
A bash script.

This whole problem actually happened to several SkyLabs managed Mikrotiks over the summer of 2022 as we needed to upgrade the SSL certificates on them.
But with the disk full the new certificate would either not even get onto the disk of the boxes or corrupted as the whole certificated could not be written to the disk.
In hindsight, I wonder how the guy updating the certs did it.
As I've updated the status script on all boxes without issue.

## Sniff-sniff!
The first Mikrotik "/tool/sniffer" pcap file I ever inspected was named "sniffsniff".
I found it on a SkyLabs box, it's likely ancient and only had DHCP data if I remember correct.

But that's neither here nor there.

You see I got this interesting task after one of our customers wanted logging and blacklisting.
This was after it was discovered on their end that somebody was using their guest network for hacking attempts.
Specifically SQL injection against a bunch of servers, supposedly mostly Oracle and Amazon ones.

### Skrrting our efforts
So for this I got to see for myself how powerful the Mikrotik sniffer tool actually is.
The plan would be to use the built-in sniffer, find the mac of whoever is doing the naughty stuff.
And then just blacklist by MAC.
Any hacker should be able to just use bogus macs tho.
And if they're extra clever they might even impersonate legitimate users.
That would for sure mess up our blocking efforts big time.
If you ask me the only solution then would be to require captive portal authentication with SMS code.
Or some other one where you have to put in some personal info.

### Implementation
Mikrotik routers or anything running RouterOS have that built-in /tool/sniffer thing.
It can directly output pcap files to a disk, but it also has a streaming option.
But that stream would be using a protocol called [TZSP](https://en.wikipedia.org/wiki/TZSP) or TaZmen Sniffer Protocol.
So I found a neat open source tool written in C called "[tzsp2pcap](https://github.com/thefloweringash/tzsp2pcap)".
It does exactly as the name would imply.
You may read my little guide on it [here](../tzsp2pcap).

So for the capture setup I used this streaming option, so we could store a bunch more packets than directly on the box.
After fiddling around with the filtering options of the /tool/sniffer I ran the tzsp2pcap with screen on our production VPN server with options to write to a new file whenever the current file would reach 1 GB.
Then I just manually moved them to my work computer and the backup server.
If this were going to continue, I'd make some script to automagically move stuff and run that with a cron job once or twice a week.

### Conclusion
I ran the thing over a weekend and then some, but it was all useless.
As the customer in question wanted to resign our services the Monday after we started sniffing...
Was still a fun learning experience tho.
And I got to use Wireshark during work! :grin:
