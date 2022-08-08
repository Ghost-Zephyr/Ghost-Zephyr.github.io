---
date: 2022-06-11T17:33:55Z
draft: false
aliases: []
categories: ['docker']
series: ['apprentice']
tags: ['programming', 'devops', 'docker']
chroma: true
toc: true
title: Docker
description: Introduction to Docker for local development and production deployment ready images.
---

Docker is a super container management system that lets you isolate programs and services.
This is very useful, both during development and for production deployment.
Because all dependencies may be bundled into the "docker image".

And if the program/service is hacked.
The adversary will only have access to the container.
Which with proper configuration should make it super hard for any adversary to gain persistence.

## Local development
When using docker for local development.
You'd likely want to have a container that has all tools and dependencies for the project.
But not the project itself, because you'd mount that into the container with the latest local changes.

So for example a simple project would just need a compiler or interpreter for the programming language.
And you should be good to go!
Although you'd want to have auto-reloading or similar to automagically run or reload on code changes.

### Simple example
This is a simple docker setup for local development of a simple python web-app.

The Dockerfile; Dockerfile.local
{{< highlight docker >}}{{% asset "apprentice/docker/basic/local-dev.dockerfile" %}}{{< /highlight >}}

Build it;
{{< highlight shell >}}docker build -t python-webapp Dockerfile.local{{< /highlight >}}
Run it;
{{< highlight shell >}}docker run -v ./:/opt -itp 8080:80 python-webapp ./run.py{{< /highlight >}}

## Production ready images
For production on the other hand.
You want the application with the whole runtime within the docker image.
And you want it to be as standalone as possible for easy deployment in Kubernetes and the like.

The only real change needed to our simple python web-app example would be including the app in the docker image.

{{< highlight docker >}}{{% asset "apprentice/docker/basic/production.dockerfile" %}}{{< /highlight >}}

The only difference from the local development version is the COPY of the entire project folder.
Instead of just the requirements.txt, if you have any sort of build step.
You'd likely want to either just include the built application.
Or maybe even try docker multistep builds.

Doing so allows you to have one docker based build environment.
And a completely different one for the runtime that will become the actual docker image.
This is very good for many reasons, main one usually being minimal docker images.

For such advanced usage see [docker-fix](../docker-fix).
