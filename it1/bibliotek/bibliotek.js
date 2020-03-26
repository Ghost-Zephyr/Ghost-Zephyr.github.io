
var add = function() {
    db.collection("bibliotek").add({
        tittel: $('#title')[0].value,
        forfatter: $('#author')[0].value,
        forlag: $('#publisher')[0].value,
        terningkast: $('#rating')[0].value,
        utgitt: $('#published')[0].value
    }).then(function() {
        $('#status').html('<p style="color: green;">La til bok '+$('#title').value+'!</p>')
    }).catch(function() {
        $('#status').html('<p style="color: red;">Problem med å legge til bok '+$('#title').value+'!</p>')
    })
}

