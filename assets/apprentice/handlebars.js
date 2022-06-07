
// This does mostly the same as that example from the official docs
let simple = () => {
  let template = Handlebars.compile("Handlebars <b>{{doesWhat}}</b>")
  let out = template({ doesWhat: "rocks!" })
  console.log(out)
  return out
}

let nested = () => {
  // This uses each for context switching and uses a nested links parameter
  let template = Handlebars.compile(`
<ul>
  {{#each links}}
  <li><a href='{{href}}' target='_blank'>{{text}}</a></li>
  {{/each}}
</ul>`)
  return template({
    links: [{
      'href': 'https://handlebarsjs.com/guide',
      'text': 'Handlebars official guide'
    }, {
      'href': 'https://io.sivert.pw',
      'text': 'Awesome blog!'
    }]
  })
}

// This is how handlebars comments work
let comments = Handlebars.compile(`
{{! This comment will not show up in the output}}
<!-- This comment will show up as HTML-comment -->
{{!-- This comment may contain mustaches like }} --}}
inspect element here!`)()

// Simple helper
Handlebars.registerHelper('censor', (str) => {
  return str.replaceAll('fuck', 'f***').replaceAll('hell', 'h***')
})

// Block helper
Handlebars.registerHelper('', (items, options) => {

})

// Handlebars registered partial
Handlebars.registerPartial('', '')

inlinePartial = `
{{#*inline "inlinePartial"}}

{{/inline}}`

// Calling non-existent partials with block syntax uses the block content as fallback
let advanced = () => {
  return Handlebars.compile(`
{{censor profanity}}`)({'profanity': 'fuckin hell man!'})
}

// Run "main" after all is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add a output element to the end of the Table of Contents
  let output = document.createElement('div')
  output.id = 'output'
  document.getElementById('meta').append(output)

  // Here we use those "triple mustaches"!
  let template = Handlebars.compile(`
<br /><div>
<h4>Examples output:</h4>
<h5>Functions:</h5>
<p>Simple: {{{simple}}}</p>
<p>Nested: {{{nested}}}</p>
<p>Comments: {{{comments}}}</p>
<p>Advanced: {{{advanced}}}</p></div>`)

  // Render and insert the template above
  document.getElementById('output').innerHTML = template({
    simple: simple(), nested: nested(), comments: comments, advanced: advanced()
  })
})
