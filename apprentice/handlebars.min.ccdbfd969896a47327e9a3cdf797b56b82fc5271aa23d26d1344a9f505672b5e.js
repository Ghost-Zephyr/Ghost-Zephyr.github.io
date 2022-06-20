let simple=()=>{let t=Handlebars.compile("Handlebars <b>{{doesWhat}}</b>"),e=t({doesWhat:"rocks!"});return console.log(e),e},comments=Handlebars.compile(`
{{! This comment will not show up in the output}}
<!-- This comment will show up as HTML-comment -->
{{!-- This comment may contain mustaches like }} --}}
inspect element here!`)(),nested=Handlebars.compile(`
<ul>
  {{#each links}}
  <li><a href='{{href}}' target='_blank'>{{text}}</a></li>
  {{/each}}
</ul>`)({links:[{href:"https://handlebarsjs.com/guide",text:"Handlebars official guide"},{href:"https://io.sivert.pw",text:"Awesome blog!"}]});Handlebars.registerHelper("censor",e=>e.replaceAll("fuck","f***").replaceAll("hell","h***")),Handlebars.registerHelper("noop",e=>e.fn(this)),Handlebars.registerPartial("people",`
<ul>
  {{#each members}}
  <li>{{name}} age {{age}} from {{home}}</li>
  {{/each}}
</ul>`);let advanced=Handlebars.compile(`
{{censor profanity}}

{{#> people members}}
  <b>Some thing went wrong, man!</b>
{{/people}}

<ul>
  {{#each members}}
  <li>{{name}} age {{age}} from {{home}}</li>
  {{/each}}
</ul>`)({profanity:"fuckin hell man!",members:[{home:"Never Never Land",name:"Peter",age:120},{home:"Trollhättan",name:"Clark",age:75}]});document.addEventListener("DOMContentLoaded",function(){let e=document.createElement("div");e.id="output",document.getElementById("meta").append(e),Handlebars.registerPartial("layout","<br /><div>{{> content }}</div>");let t=Handlebars.compile(`
{{#> layout}}
  {{#*inline "content"}}
    <h4>Examples output:</h4>
    <h5>Functions:</h5>
    <p>Simple: {{{simple}}}</p>
    <p>Nested: {{{nested}}}</p>
    <p>Comments: {{{comments}}}</p>
    <p>Advanced: {{{advanced}}}</p>
  {{/inline}}
{{/layout}}`);e.innerHTML=t({simple:simple(),nested,comments,advanced})})