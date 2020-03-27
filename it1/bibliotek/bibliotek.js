
var db = firebase.firestore()

var list = function(user) {
    db.collection("bibliotek")
        .withConverter(bookConverter)
        .get()
        .then(function(query) {
            html = '<br/>'
            query.forEach(function(doc) {
                book = doc.data()
                html += book.toHtml(user)
            })
            $('#books').html(html)
        }).catch(function(error) {
            $('#books').html('<h3>Kunne ikke hente bøker!</h3><br/><p>'+error+'</p>')
            $('#books').css('color', 'red')
        })
}

var add = function() {
    db.collection("bibliotek")
        .withConverter(bookConverter)
        .add(new Book(
            $('#title')[0].value,
            $('#author')[0].value,
            $('#publisher')[0].value,
            $('#rating')[0].value,
            $('#published')[0].value
        )).then(function() {
            $('#status').html('<p>La til bok '+$('#title')[0].value+'!</p>')
            $('#status').css('color', 'green')
            list(firebase.auth().currentUser)
        }).catch(function() {
            $('#status').html('<p>Problem med å legge til bok '+$('#title')[0].value+'!</p>')
            $('#status').css('color', 'red')
        })
}

var remove = function(id) {
    db.collection("bibliotek").doc(id)
        .delete().then(function() {
            list(firebase.auth().currentUser)
        }).catch(function(error) {
            alert("Error removing document: ", error)
        })
}

firebase.auth().onAuthStateChanged(function(user) {
    list(user)
})

