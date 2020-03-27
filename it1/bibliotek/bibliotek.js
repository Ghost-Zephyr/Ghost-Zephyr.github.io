
var firestore = firebase.firestore

var list = function() {
    // db.collection('bibliotek').doc("8ZBX5gmIaRwQBCjgLLg0").get().then(function(doc){console.log(doc.data())})
    // db.collection('bibliotek').get().then(function(query){query.forEach(function(doc){console.log(doc.data())})})
    db.collection('bibliotek')
        .withConverter(bookConverter)
        .get()
        .then(function(query) {
            html = ''
            query.forEach(function(doc) {
                book = doc.data()
                html += book.toHtml()
            })
            $('#books').html(html)
        })
        .catch(function(error) {
            $('#books').html('<h3>Kunne ikke hente bøker!</h3><p>'+error+'</p>')
            $('#books').css('color', 'red')
        })
}

var add = function() {
    let millis = Date.parse($('#published')[0].value)
    db.collection("bibliotek").add({ // withConverter ?
        tittel: $('#title')[0].value,
        forfatter: $('#author')[0].value,
        forlag: $('#publisher')[0].value,
        terningkast: $('#rating')[0].value,
        utgitt: new firestore.Timestamp(millis/1000, 0)
    }).then(function() {
        $('#status').html('<p>La til bok '+$('#title')[0].value+'!</p>')
        $('#status').css('color', 'green')
    }).catch(function() {
        $('#status').html('<p>Problem med å legge til bok '+$('#title')[0].value+'!</p>')
        $('#status').css('color', 'red')
    })
}

$(document).ready(function() {
    list()
})

