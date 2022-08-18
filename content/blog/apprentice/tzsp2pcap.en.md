---
date: 2022-08-18T09:57:34Z
draft: false
aliases: []
categories: ['documentation', 'networking']
series: ['apprentice']
tags: ['net', 'os']
chroma: true
toc: true
title: Tzsp2pcap
description: TaZmen Sniffer Protocol to Packet CAPture utility program.
---

This is a very useful tool when working with Mikrotiks.
As their built-in sniffer tool has support for TZSP (TaZmen Sniffer Protocol) streaming.
This will send all packets that match the filtering options to some destination over TZSP/UDP.

This destination may be some machine running this tzsp2pcap.
Allowing you to get a pcap remotely from a Mikrtoik without touching the Mikrotiks disk.
This is super useful if the box has traffic as the Mikrotik routers usually has a disk with a size in megabytes.

## Using tzsp2pcap
The program has all the options it should.

Allowing you to specify listening port, output file, receive buffer size, output file rotation and some more.

{{< highlight sh >}}# tzsp2pcap -h

tzsp2pcap: receive tazmen sniffer protocol over udp and
produce pcap formatted output

Usage tzsp2pcap [-h] [-v] [-f] [-p PORT] [-o FILENAME] [-s SIZE] [-G SECONDS] [-C SIZE] [-z CMD]
	-h           Display this message
	-v           Verbose (repeat to increase up to -vv)
	-f           Flush output after every packet
	-p PORT      Specify port to listen on  (defaults to 37008)
	-o FILENAME  Write output to FILENAME   (defaults to stdout)
	-s SIZE      Receive buffer size        (defaults to 65535)
	-G SECONDS   Rotate file every n seconds
	-C FILESIZE  Rotate file when FILESIZE is reached
	-z CMD       Post-rotate command to execute
{{< /highlight >}}
