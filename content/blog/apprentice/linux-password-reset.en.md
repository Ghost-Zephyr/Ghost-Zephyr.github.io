---
date: 2022-08-18T03:10:27Z
draft: false
aliases: []
categories: ['documentation', 'various']
series: ['apprentice']
tags: ['various', 'useful']
chroma: true
toc: true
title: Linux Desktop Password Reset
description: Simple guide to reset the password on Linux machines to which you have physical access to the disk.
---

Hacking stuff is usually pretty trivial.
As long as you've got physical access that is.
And here I'll instruct you on how to reset passwords on a Linux installation.
Either by booting a live ISO.
Or by plugging the drive with the installation you'd like to reset some password(s) on into another Linux machine.

Realistically, repairing a broken installation is pretty similar.
Although be aware that setting up the chroot may require additional steps.
And actually fixing it would be harder than just running passwd in chroot on the installation.

## Setup
For passwd we don't need any fancy setup, we just need the rootfs mounted, chroot into it and run passwd.
Run "lsblk" to identify the disk you'll need to mount.
Then mount it to /mnt.
Some distros have software that can mount drives automatically to some media folder.
This is fine for passwd, but for system repair operations you'd want to unmount that if it happens and do the whole setup manually.

For a system repair chroot setup use these additional mounts to make sure tools interacting with the system work.
Assuming you mounted the rootfs and potentially the boot/EFI partition to /boot or /boot/efi.

{{< highlight sh >}}mount -R /sys /mnt/sys
mount -R /dev /mnt/dev
mount -B /run /mnt/run
mount --make-rslave /mnt/sys
mount --make-rslave /mnt/dev
mount --make-slave /mnt/run
mount --types proc /proc /mnt/proc
{{< /highlight >}}

The options -R and -B for mount are short hands for \-\-rbind and \-\-bind.

## Fixing
For doing the password reset or other operations on the installation other than simple file edits, you just chroot into the installation.

{{< highlight sh >}}chroot /mnt /bin/bash{{< /highlight >}}

You may also specify a new shell or one command with options to run in the new root after the path of the root.
Also \-\-groups with group names and \-\-userspec with names or IDs of the main user and group to use during the chroot.
Usually you'd want to just chroot using the root user.
And to all the stuff you need to.

Like the password reset!

{{< highlight sh >}}passwd{{< /highlight >}}

And then exit the chroot shell and proceed with the cleanup before rebooting into the fixed installation.

{{< highlight sh >}}exit{{< /highlight >}}

## Cleanup
Run "umount \-\-recursive" on the rootfs mount point as root.

{{< highlight sh >}}umount -R /mnt{{< /highlight >}}
