
var db = firebase.firestore()

var list = function() {
    db.collection('gjestebok')
        .withConverter(commentConverter)
        .get()
        .then(function(query) {
            html = '<br/>'
            query.forEach(function(doc) {
                book = doc.data()
                html += book.toHtml()
            })
            $('#kommentarer').html(html)
        }).catch(function(error) {
            $('#kommentarer').html('<h3>Kunne ikke hente bøker!</h3><br/><p>'+error+'</p>')
            $('#kommentarer').css('color', 'red')
        })
}

var add = function() {
    db.collection("gjestebok")
        .withConverter(commentConverter)
        .add(new Comment(
            $('#navn')[0].value,
            $('#melding')[0].value
        )).then(function() {
            $('#status').html('<p>La til melding med navn '+$('#navn')[0].value+'!</p>')
            $('#status').css('color', 'green')
            list()
        }).catch(function() {
            $('#status').html('<p>Problem med å legge til melding med navn '+$('#navn')[0].value+'!</p>')
            $('#status').css('color', 'red')
        })
}

list()

/*
$(document).ready(function() {
    list(firebase.auth().currentUser)
})
*/

