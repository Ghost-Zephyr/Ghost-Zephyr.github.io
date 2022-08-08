---
date: 2022-06-20T14:06:54Z
draft: true
aliases: []
categories: ['documentation']
series: ['apprentice', 'cms']
tags: ['wordpress', 'tech', 'cms']
chroma: false
toc: true
title: WordPress
description: The worlds most popular and whackiest web page Content Management System
---

WordPress is by far the world's most popular Content Management System.
And it makes sense with its ease of use.
It's famous for letting anyone have a blog setup within 5 minutes.

For the initial setup you just create an account for the admin panel.
And set things like the base URL/domain for the web page.

After that you're free to explore the /wp-admin and make the content for the page.
There is also the healthy plugin and theme marketplaces for WordPress that you may access from within the admin pages of a standard WordPress setup.
So without any technical skills one should be able to make a WordPress page or blog that looks fine and even has web store integration against stripe or some alternative payment provider.
By far the most popular option for having a simple web store is WooCommerce using stripe.

Anyway, while this is all cool, fine and dandy.
WordPress is super slow.
Because it's a PHP web-app where all requests should be run through the same index.php file.
The problem with this is that it has heavy implications for the security setup of the web server hosting the thing.
But also performance as that index.php would load the whole WordPress setup, including plugins and theme.

So what can we do about it?

Well as it turns out, a lot!

## Simple WordPress improvements
The first and easiest thing to do to a WordPress page is adding caching of the page.
The best WordPress cache plugin is [WP Fastest Cache](https://wordpress.org/plugins/wp-fastest-cache/).
Any cache should help with page load, but that one is for sure the best option.
And of course I'd recommend going through all the configuration options, but the defaults should be fine.
This and any other self-respecting WordPress cache plugin should be able to automagically detect when pages need re-rendering and if not show the cached version of the page.

## WordPress security
When it comes to securing a WordPress setup, it's important to make sure the actual web server in use is configured properly.
Here I'll showcase some example nginx and Apache configs for a hardened WordPress installation.
If your WordPress is installed in some shared hosting solution.
Then it's up to the hosting provider to configure the web server and potentially php-fpm or something properly.
