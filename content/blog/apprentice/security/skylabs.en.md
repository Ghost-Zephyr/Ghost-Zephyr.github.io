---
date: 2022-07-04T13:35:43Z
draft: false
aliases: []
categories: ['apprentice']
series: ['hacking', 'security']
tags: ['apprentice', 'tech', 'bug']
chroma: true
toc: true
title: SkyLabs
description: Security issues I found working as an apprentice at SkyLabs AS. Compared to Sircon, these ones I actually had to figure out how to fix myself.
---

SkyLabs has surprisingly good stability compared to expectations based on the codebase.
I'm guessing it's a byproduct of Python that let's us fail pretty safely on almost all endpoints.
The in-house development is mainly four services, two JS frontends and two Python Flask backends, all web.

These services are a captive portal, it's API and an admin interface web app and it's API.

We support lots of interesting [authentication](https://wiki.skylabs.no/partner:authentication) methods!~

## Sky ID Admin
And so far the only real security related issue I've found in the in-house codebase is that the Access Control was missing a check.
The problem is that API keys that are associated with a deleted account is valid.
Allowed methods are by x-api-key Authorization header, api-key as an url parameter or by Json Web Token.
The JWT is passed in an Authorization Bearer header, which is wrong, [Bearer](https://datatracker.ietf.org/doc/html/rfc6750) Auth header prefix should be reserved for [OAuth 2](https://datatracker.ietf.org/doc/html/rfc6749).

Anyway when using API keys, not JWT, the server just fetches the API key record from the database.
The function calls for this goes from the Access Control controller class through an API key controller.
Problem is the API key controller class only checks if the associated user exists, not if it's been marked as deleted.
So if you have an API key, you may have your accounts full access after it's supposedly been deleted.

And the fix for it was super easy!~

We use a custom endpoint decorator, like flasks own @app.route, but we control what happens.
It's here the authentication is implemented, on all requests that go to routes defined with this decorator will run the Access Control controller.
Access Control goes through the auth options in its dunder init function and sets self.current_user to some admin user from the database.
To fix the problem I could've made this check specific to the API keys by putting it in the API key controller that also has a user getter function.
But I chose to add an if statement to the Access Control user getter, this is called by our endpoint decorator.
So I literally just changed this.

{{< highlight py >}}{{% asset "apprentice/security/accesscontrol.py" %}}{{< /highlight >}}

To that!

{{< highlight py >}}{{% asset "apprentice/security/accesscontrol-fix.py" %}}{{< /highlight >}}

To fix this issue.

If you wonder why we "raise Forbidden".
It has to do with the endpoint decorator which will catch all errors.
And will report them to us by e-mail and a slack bot.
The HTTP response will be error 500 if it's a Python error.
But if it's one of our own error classes that's been raised.
Then an error code, description and status code will be taken from that exception class and sent as the response.

There is also the case of the JWT secret key that's wayyy too small.
And not changed since it was introduced in the admin API.
Old keys is a theme on SkyLabs servers.

I'm surprised no one, as far as we know anyway, has broken into the servers yet.

### Funny
Something I find kinda funny is the fact that those exception descriptions are in English, but the admin frontend is entirely in Norwegian only.
It's even got a big ass JavaScript file that maps all the error codes to messages.
And the best part about that whole situation is the fact that my boss/the sales guy at the company wants to sell our services outside Norway...
The only part that supports multiple languages is the actual captive portal, but even that has a bug which makes it so that only two languages can be active at one time.

### Minor
One minor issue I found in our production system is the password for the "system" account.
The password for that account is a real shitty one that I've seen used several palaces at the company.
It's even been used as a Wi-Fi password.
To fix this one very easily I just enabled 2FA on the account.
But the whole account should probably just be deleted as nobody ever uses it.

{{< raw >}}
<!-- You cheecky bastard! -->
{{< /raw >}}
<!--
## Servers
{{< img src="apprentice/skyid/old-intrauser-key.png" caption="The old intrauser ssh key" >}}

On the other side, the cloud servers had some bigger problems.
Here I did find a *BIG* security issue. Ancient ssh keys.
We use Ansible to manage the servers and deploy code updates.
There is an Ansible var file that has a list of user accounts with options for shell and ssh pubkey.
That file also has a list of old accounts that should be deleted.
These are per employee users.
But the intrauser and Ansible users have existed since 2016...
using the same keys that they were created with.
The reason this is such a big threat is the fact that the Ansible and all employee accounts has sudo access without password.

The intrauser does actually have a password set, but it may use sudo without password when running rsync.
And the thing is, [gtfobins](https://gtfobins.github.io/) has a privilege escalation exploit for rsync that our servers are vulnerable to.

So check it; these screenshots are from SkyLabs' Ansible git log!~

{{< img src="apprentice/skyid/intrauser-key.png" caption="Me finally updating the key" >}}

And it's even worse... as it turns out the OpenVPN setup also has keys from guess when!
That's right! 2016...
So even if you only got access to the intrauser, it's super easy getting local privilege escalation on the servers.

To be honest I'm quite surprised the servers hasn't been pwnd big time!

As I've in fact proven that any ex-employee that has a copy of our Ansible repo could easily forge OpenVPN client keys and certificates.
And also got full root access over ssh anyway.
Just add a little [Tor](https://torproject.org/) magic on top of that, and you got full access to all the servers without us being able to trace it back...
-->
{{< raw >}}
<!-- Grep my github.io repo for secrets located here! -->
{{< /raw >}}
