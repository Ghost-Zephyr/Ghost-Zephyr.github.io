
// This does mostly the same as that example from the official docs
let simple = () => {
  let template = Handlebars.compile("Handlebars <b>{{doesWhat}}</b>")
  let out = template({ doesWhat: "rocks!" })
  console.log(out)
  return out
}

// This is how handlebars comments work
let comments = Handlebars.compile(`
{{! This comment will not show up in the output}}
<!-- This comment will show up as HTML-comment -->
{{!-- This comment may contain mustaches like }} --}}
inspect element here!`)()

// This uses each for context switching and uses a nested links parameter
let nested = Handlebars.compile(`
<ul>
  {{#each links}}
  <li><a href='{{href}}' target='_blank'>{{text}}</a></li>
  {{/each}}
</ul>`)({
  links: [{
    'href': 'https://handlebarsjs.com/guide',
    'text': 'Handlebars official guide'
  }, {
    'href': 'https://io.sivert.pw',
    'text': 'Awesome blog!'
  }]
})

// Simple helper
Handlebars.registerHelper('censor', (str) => {
  return str.replaceAll('fuck', 'f***').replaceAll('hell', 'h***')
})

// Block helper
Handlebars.registerHelper('noop', (options) => {
  return options.fn(this)
})

// Handlebars registered partial
Handlebars.registerPartial('people', `
<ul>
  {{#each members}}
  <li>{{name}} age {{age}} from {{home}}</li>
  {{/each}}
  balle!
</ul>`)

// Calling non-existent partials with block syntax uses the block content as fallback
let advanced = Handlebars.compile(`
{{censor profanity}}

{{#> people members}}
  <b>Some thing went wrong, man!</b>
{{/people}}

<ul>
  {{#each members}}
  <li>{{name}} age {{age}} from {{home}}</li>
  {{/each}}
</ul>`)({
  'profanity': 'fuckin hell man!',
  'members': [{
    'home': 'Never Never Land',
    'name': 'Peter',
    'age': 120
  }, {
    'home': 'Trollhättan',
    'name': 'Clark',
    'age': 75
  }]
})

// Run "main" after all is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add a output element to the end of the Table of Contents
  let output = document.createElement('div')
  output.id = 'output'
  document.getElementById('meta').append(output)

  // When creating a partials you may use {{> @partial-block }} to capture the block content
  Handlebars.registerPartial('layout', '<br /><div>{{> content }}</div>')

  // Here we use those "triple mustaches"!
  let template = Handlebars.compile(`
{{#> layout}}
  {{#*inline "content"}}
    <h4>Examples output:</h4>
    <h5>Functions:</h5>
    <p>Simple: {{{simple}}}</p>
    <p>Nested: {{{nested}}}</p>
    <p>Comments: {{{comments}}}</p>
    <p>Advanced: {{{advanced}}}</p>
  {{/inline}}
{{/layout}}`)

  // Render and insert the template above
  output.innerHTML = template({
    simple: simple(), nested: nested, comments: comments, advanced: advanced
  })
})
