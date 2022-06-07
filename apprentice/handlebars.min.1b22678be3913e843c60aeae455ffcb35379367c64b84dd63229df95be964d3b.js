let simple=()=>{let t=Handlebars.compile("Handlebars <b>{{doesWhat}}</b>"),e=t({doesWhat:"rocks!"});return console.log(e),e},nested=()=>{let e=Handlebars.compile(`
<ul>
  {{#each links}}
  <li><a href='{{href}}' target='_blank'>{{text}}</a></li>
  {{/each}}
</ul>`);return e({links:[{href:'https://handlebarsjs.com/guide',text:'Handlebars official guide'},{href:'https://io.sivert.pw',text:'Awesome blog!'}]})},comments=Handlebars.compile(`
{{! This comment will not show up in the output}}
<!-- This comment will show up as HTML-comment -->
{{!-- This comment may contain mustaches like }} --}}
inspect element here!`)();Handlebars.registerHelper('censor',e=>e.replaceAll('fuck','f***').replaceAll('hell','h***')),Handlebars.registerHelper('',()=>{}),Handlebars.registerPartial('',''),inlinePartial=`
{{#*inline "inlinePartial"}}

{{/inline}}`;let advanced=()=>Handlebars.compile(`
{{censor profanity}}`)({profanity:'fuckin hell man!'});document.addEventListener("DOMContentLoaded",function(){let e=document.createElement('div');e.id='output',document.getElementById('meta').append(e);let t=Handlebars.compile(`
<br /><div>
<h4>Examples output:</h4>
<h5>Functions:</h5>
<p>Simple: {{{simple}}}</p>
<p>Nested: {{{nested}}}</p>
<p>Comments: {{{comments}}}</p>
<p>Advanced: {{{advanced}}}</p></div>`);document.getElementById('output').innerHTML=t({simple:simple(),nested:nested(),comments,advanced:advanced()})})