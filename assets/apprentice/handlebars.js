
// This does mostly the same as that example from the official docs
let simple = () => {
  let template = Handlebars.compile("Handlebars <b>{{doesWhat}}</b>")
  let out = template({ doesWhat: "rocks!" })
  console.log(out)
  return out
}

let nested = () => {

}

let eval = () => {

}



// Simple helper
Handlebars.registerHelper('', (str) => {
  return ''
})

// Block helper
Handlebars.registerHelper('', (items, options) => {

})

// Handlebars registered partial
Handlebars.registerPartial('', '')

inlinePartial = `
{{#*inline "inlinePartial"}}

{{/inline}}`


let advanced = () => {

}


// Run "main" after all is loaded
document.addEventListener("DOMContentLoaded", function() {
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
<p>Eval: {{{eval}}}</p></div>`)

  // Render and insert the template above
  document.getElementById('output').innerHTML = template({
    simple: simple(), nested: nested(), eval: eval()})
})
