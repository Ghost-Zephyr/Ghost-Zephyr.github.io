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

{{< img
  src="apprentice/debian/bouton.jpg"
  caption="The biggest of the official Debian button logos"
  hint=icon quality=100 >}}

<!-- Security? -->

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

{{< img
  src="apprentice/debian/button-1.gif"
  caption="The first Debian button logo by [Craig Small](mailto:csmall@debian.org)"
  hint=icon quality=100 >}}

In 1996 dpkg was already an essential part of Debian and Bruce Perens got the project leadership.
He was a controversial leader and drafted the Debian Social Contract.
During this time the Free Software Foundation would pull their sponsorship for the project.
And Perens would go on to create the organization "[Software in the Public Interest](https://spi-inc.org)".
He also wrote BusyBox to make it possible to have a Debian installer on a single floppy drive.

From 1999, the project leader was elected yearly.
The number of applicants was overwhelming, and the project established the new member process.
After this Debian slowly evolved into what it is today.

## Derivative works
As of writing, Aug. 18th 2022, [DistroWatch](https://distrowatch.com) lists 118 active Debian based distros.
And 404 also counting discontinued Debian based distros.
Debian GNU/kFreeBSD only had one official stable port with the release of Debian 7.0 (Wheezy).
That would of course be Debian with GNU user land utilities using the FreeBSD kernel.

{{< img
  src="apprentice/debian/devuan-logo.svg"
  title="Devuan logo"
  caption="A Debian fork not using systemd" >}}

And Debian GNU/Hurd using the GNU Hurd microkernel.
It has been developed since 1998, but has never had an official Debian release.
Still it's maintained and developed as an unofficial port.

In my opinion [Devuan](https://devuan.org) is one of the best Debian forks, but that may just be the systemd hate speaking.
It has been mirroring Debian since 2017, but with systemd removed and sysvinit, runit or openrc as supported init system alternatives.

## Package management
On Debian package management is done mainly through APT, the "Advanced Packaging Tool".
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

## Branches
There are three main branches, or as they may also be called suits or (sub?)distributions of Debain.
These are *stable*, *testing* and *unstable*.
*Unstable* has the latest and greatest software, but has no stability guarantees.
After being barely tested in *unstable* packages are moved to *testing*.
The *testing* branch gets "freezed" some time after a new Debian version.
During this time the *testing* branch is, well, tested extensively to find bugs.
Then they try and patch all the bugs to create the next major version.

Debian does have some other branches, like the *oldstable*, *oldoldstable* and *stapshot* branches.
Oldstable is the previous major Debian branch.
And oldoldstable is the one before that.
The snapshot branches however are some other branch at some specific time.

{{< img
  src="apprentice/debian/hexagonal.png"
  tite="Hexagonal Debian swirl logo"
  caption="Also by [Elena Grandi](mailto:valhalla@trueelena.org), **sauce** may be found in the \"[Debian flyers repo](https://salsa.debian.org/debian/debian-flyers/tree/master/hexagonal-sticker)\""
  hint=icon >}}

As frozen branches usually only means features of packages are frozen.
Of course security, performance and stability updates are applied.

## Branding
The Debian "swirl" logo was made by Raul Silva in 1999 as part of a contest to replace the old semi-official logo that had been in use.
It is said that the "swirl" represents [magic smoke](https://en.wikipedia.org/wiki/Magic_smoke)!
Raul would win a @debian.org email address, and a set of Debian 2.1 CDs for the architecture of his choice.

One theory about the origin of the Debian logo is that [Buzz Lightyear](https://en.wikipedia.org/wiki/Buzz_Lightyear) not only has a little swirl on his chin.
But the first Debian release was named after him.
And [Stefano Zacchiroli](https://en.wikipedia.org/wiki/Stefano_Zacchiroli) who was the Debian leader from 2010 to 2013.
Has suggested that Buzz's swirl is the Debian swirl.
The other way around is a more likely candidate as Debian takes all their version code-names from [Toy Story](https://en.wikipedia.org/wiki/Toy_Story_(franchise)) characters.

{{< img
  src="apprentice/debian/diversity-2019.png"
  caption="Debian diversity logo by [Elena Grandi](mailto:valhalla@trueelena.org)"
  hint=icon >}}

## Features
Debian is available in 75 languages with widely varying support.
The installer itself is available in 76 languages.
As of 2022 anyway.

Debian has several Linux flavors for each supported architecture.
For example if running i386/32-bit you'd be able to use PAE ([Physical Address Extension](https://en.wikipedia.org/wiki/Physical_Address_Extension)) if the computer itself supports it.
PAE lets a CPU use 64-bit memory addresses while otherwise running in a lower-bit mode.
This is to be able to use more than 4 Gigabytes of RAM at once.

Debian officially only use open source software.
But it's easy adding the "contrib" and "non-free" repository areas for installing stuff like the proprietary Nvidia drivers.

Debian has problems with built-in multimedia support as codecs are often threatened by patent infringements, are without source code or under too restrictive licenses.
While you'd think all this stuff could just go in the "non-free" repository area.
Software such as [libdvdcss](https://videolan.org/developers/libdvdcss.html) by [VideoLAN](https://videolan.org), the creators of [VLC Media Player](https://videolan.org/vlc/), is not hosted by Debian in their official repositories.

### A notable 3rd party repo
A notable 3rd party repository is [deb-multimedia.org](https://deb-multimedia.org/), formerly debian-multimedia.org, providing software not present in official Debian repositories.
Like Windows codecs, libdvdcss and the [Adobe Flash Player](https://en.wikipedia.org/wiki/Adobe_Flash_Player).
The repository is maintained by [Christian Marillat](https://qa.debian.org/developer.php?login=marillat%40deb-multimedia.org) who is a Debian developer.
But deb-multimedia is not part of Debian and is not hosted on Debian servers.

The deb-multimedia repository has packages already in official Debian repos, appraently interfearing with official maintenance.
In 2012 this lead to [Stefano Zacchiroli](https://en.wikipedia.org/wiki/Stefano_Zacchiroli), the Debian leader at the time, would ask Marillat to either settle an agreement about the packaging or to stop using the Debian name.
Mariallt chose the latter and debian-multimedia.org became deb-multimedia.org.
This repo was so popular at the time that the name change and URL switch was announced on the official Debian blog.

## Development
Each package has a maintainer which is either a single person or a team of people.
The maintainer keeps track of changes to the packaged software, and ensures that the package coheres with the Debian Policy and quality standards.
The packaged software often include modifications/patches to achieve this and even to fix non-Debian specific bugs.

All Debian maintainers have individual sets of OpenPGP key pairs used for digitally signing packages to be uploaded to the repositories.
Newly uploaded packages' signatures are validated, and if valid, will be distributed to the hundreds of Debian repo mirrors all over the world daily.
Debian developers are responsible for any package they upload even if the package was prepared by another contributor.

Initially a newly added package will only be available in the *unstable* branch.
For a package to become a candidate for the next release, it must migrate to the *testing* branch by meeting several requirements.

1. Time in *unstable*, depending on change urgency.
2. No "release-critical" bugs.
3. No outdated versions in *unstable* for any release port/architecture.
4. The migration does not break any package in *testing*.
5. Its dependencies can be satisfied by packages already in *testing* or by packages being migrated at the same time.
6. The migration is not blocked by a freeze.

This is all fine and dandy.
But it happens that release-critical bugs pops up in shared libraries which many packages may depend on.
This prevents those packages from entering *testing*, as we have to wait for the updated library to get updated first.
However, this whole migration stuff happens twice a day, so shouldn't be much of a problem.
This also renders *testing* a perpetual beta.

Sometimes the guidelines will be published for readying up for a new release.
Then a freeze of *testing*, after everything is "reasonably up-to-date" and other significant issues are resolved.
Then the *testing* branch becomes the new *stable*.

One version of a package may be in several branches at the same time.
Usually *testing* and *unstable*, but if the same version of a package are keept between Debian releases.
The same package on the same version may end up in *oldstable*, *stable*, *testing* and *unstable* at the same time.

One way many people bypass this whole setup is with cross distro package managers that sandbox applications.
These would be package manager like flatpak, snap and brew.
When using those for the packages one needs to keep on the latest versions.
The developers of that/those applications can publish updated packages with the latest version continouesly.

New Debian versions are released approximately every 2 years.
And will get support for about 3 years with updates for major security or usability fixes.
Since Debian 3 (Squeeze) there has been a Debian LTS team that applies security updates after a Debian release has reached its end of life.
Meaning a Debian release may now get up to 5 years of support in total.
