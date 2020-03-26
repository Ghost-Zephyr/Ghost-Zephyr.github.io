
var add = function() {
    let millis = Date.parse($('#published')[0].value)
    db.collection("bibliotek").add({
        tittel: $('#title')[0].value,
        forfatter: $('#author')[0].value,
        forlag: $('#publisher')[0].value,
        terningkast: $('#rating')[0].value,
        utgitt: new firebase.firestore.Timestamp(millis/1000, 0)
    }).then(function() {
        $('#status').html('<p style="color: green;">La til bok '+$('#title')[0].value+'!</p>')
    }).catch(function() {
        $('#status').html('<p style="color: red;">Problem med å legge til bok '+$('#title')[0].value+'!</p>')
    })
}

