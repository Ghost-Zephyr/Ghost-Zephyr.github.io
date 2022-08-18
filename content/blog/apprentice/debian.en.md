---
date: 2022-06-20T14:10:48Z
draft: false
aliases: []
categories: ['documentation']
series: ['apprentice']
tags: ['linux', 'os']
chroma: false
toc: true
title: Debian
description: All about ye ol' relaiable Debian Linux distribution!
docs:
- url: https://debian-handbook.info/browse/stable/
  name: Debian Administrator's Handbook
---

Debian is a classic free and open source Linux distribution.
It's one of the oldest Linux OSes and the basis of many other distros.
Most notably Ubuntu.

Debian has three foundational documents.

The [Debian Social Contract](https://www.debian.org/social_contract)/[OG Version](https://lists.debian.org/debian-announce/1997/msg00017.html),
the [Debian Constitution](https://www.debian.org/devel/constitution) and
the [Debian Free Software Guidelines](https://wiki.debian.org/DebianFreeSoftwareGuidelines).

Debian version code-names are famously named after characters from the [Toy Story](https://en.wikipedia.org/wiki/Toy_Story_(franchise)) films.
It's unstable rolling release branch is named Sid, who in the Toy Stories regularly destroys his toys.

## Early History
The first ever Debian release was on September 15th, 1993.
It was an internal release of version 0.01.
The first public release, version 0.90, included the "[Debian Linux Manifesto](https://www.debian.org/doc/manuals/project-history/manifesto.en.html)".
That document outlining, the Debian founder, Ian Murdock's view for the Debian OS.
Calling for Debian to become an openly maintained distribution, in the spirit of GNU/Linux.

During 1994 and 1995 Debian released 0.9x versions and was sponsored by the [Free Software Foundation](https://fsf.org).
During this time Ian Murdock would delegate the base system and core package management to Bruce Perens, while Murdock focused on the management of the growing project.

In 1996 dpkg was already an essential part of Debian and Bruce Perens got the project leadership.
He was a controversial leader and drafted the Debian Social Contract.
During this time the Free Software Foundation would pull their sponsorship for the project.
And Perens would go on to create the organization "[Software in the Public Interest](https://spi-inc.org)".
He also wrote BusyBox to make it possible to have a Debian installer on a single floppy drive.

From 1999, the project leader was elected yearly.
The number of applicants was overwhelming, and the project established the new member process.
After this Debian slowly evolved into what it is today.

## Packages, Branches and Branding
Package management on Debian is done mainly through APT, the "Advanced Packaging Tool".
Although there are loads of alternative methods and apt GUI frontends.
APT uses dpkg under the hood, and this dpkg is the program responsible for managing all installed packages.
As long as snap, flatpak, (home)brew or any other alternative package manager isn't installed beside it.
Those examples however are often installed in conjunction with whatever package manager your distro of choice is.
Because they install either in their own segregated environment.
Or with all dependencies bundled and binaries that are statically linked.

The official Debian repos have several "areas" and only the free one is enabled by default.
The DFSG/Debian Free Software Guidelines define what is and isn't free software in this context.
But it's pretty trivial to add the *non-free* and *contrib* areas for installing official packages that may not be entirely free and open source.

The non-free contains packages that doesn't comply with the DFSG.
And contrib contains packages that do comply, but fail other requirements, like depending on non-free packages.


The Debian "swirl" logo is said to represent [magic smoke](https://en.wikipedia.org/wiki/Magic_smoke).


## Development and Features
Debian is available in 75 languages with widely varying support.
The installer itself is available in 76 languages.
As of 2022 anyway.



## Derivative works
As of writing, Aug. 18th 2022, [DistroWatch](https://distrowatch.com) lists 118 active Debian based distros.
And 404 also counting discontinued Debian based distros.

Debian GNU/kFreeBSD only had one official stable port with the release of Debian 7.0 (Wheezy).
That would of course be Debian with GNU user land utilities using the FreeBSD kernel.

And Debian GNU/Hurd using the GNU Hurd microkernel.
It has been developed since 1998, but has never had an official Debian release.
Still it's maintained and developed as an unofficial port.

In my opinion [Devuan](https://devuan.org) is the best Debian fork, but that may just be the systemd hate speaking.
It has been mirroring Debian since 2017, but with systemd removed and sysvinit, runit or openrc as supported init system alternatives.
