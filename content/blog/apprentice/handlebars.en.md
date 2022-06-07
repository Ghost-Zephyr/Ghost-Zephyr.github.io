---
date: 2022-05-25T09:14:23Z
draft: false
aliases: []
categories: ['documentation']
series: ['apprentice']
tags: ['javascript']
chroma: true
toc: true
title: Handlebars.js
description: Handlebars.js is a (HTML) templating engine that runs mainly in the browser, but may also run on any server that has node.js installed.
docs:
- url: https://handlebarsjs.com/guide/
  name: Handlebars official guide
---
Handlebars.js is a templating engine like jinja2, but entirely in JavaScript.

Personally I've only found pug templates very nice to work with as I love the minimal syntax.

What makes handlebars cool is it's ability to render templates both server and client side,
if you're running node.js on the server.

Running it in the frontend is super easy, check this example from the handlebars docs;

{{< highlight html >}}<!-- Include Handlebars from a CDN -->
<script src='https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js'></script>
<script>
  // compile the template
  var template = Handlebars.compile("Handlebars <b>{{doesWhat}}</b>");
  // execute the compiled template and print the output to the console
  console.log(template({ doesWhat: "rocks!" }));
</script>{{< /highlight >}}

## Basics

The arguments of this template function can be accessed within curly braces and supports full js objects that may be accessed with dot notation just like you'd expect.

The "evaluation context" may be switched using "{{#with something}}{{/with}}" or "{{#each something}}{{/each}}" for looping over some list.

There is also template comments using the syntax "{{! }}" or "{{!-- --}}" to allow "mustaches like }}".
Handlebars comments will be stripped when rendering, but html comments passes through.

## Helpers and Partials

Handlebars helpers enable you to register javascript functions that may run inside templates.
To register a helper run;
{{< highlight js "lineNos=false" >}}Handlebars.registerHelper('name', function (string) {return 'SomeString'}){{< /highlight >}}
This function may use the evaluation context as "this" within the function.

Or to make it a block helper, take two arguments;
{{< highlight js "lineNos=false" >}}Handlebars.registerHelper('name', function (items, options) {return 'SomeString'}){{< /highlight >}}

The normal helpers are called by "{{helpername [args...]}}".
Block helpers switch the evaluation context.
The helper function for these always take options and usually context as arguments.

You can also register partials like helpers with;
{{< highlight js "lineNos=false" >}}Handlebars.registerPartial('name', 'template string with {{blocks}}'){{< /highlight >}}

It should be noted that handlebars by default html escapes all results from these blocks/helpers.
If you want to avoid this then "triple mustaches" is what you're looking for.
Calling any helper function like "{{{helpername}}}" will bypass the html escaping.

## Examples

This script is running on this page;

{{< highlight js >}}{{% asset "apprentice/handlebars.js" %}}{{< /highlight >}}

{{< raw >}}
<div id='example-out'></div>
<!-- <script src='https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js'></script> -->
<script src='https://cdn.jsdelivr.net/npm/handlebars@4.7.7/dist/handlebars.js'></script>
{{< script "apprentice/handlebars.js" >}}
{{< /raw >}}
