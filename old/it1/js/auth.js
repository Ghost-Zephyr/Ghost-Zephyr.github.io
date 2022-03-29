
var signin = function() {
    firebase.auth()
        .signInWithEmailAndPassword($('#mail')[0].value, $('#password')[0].value)
        .then(function() {
            document.location.href = "/it1/"
        }).catch(function(error) {
            $('#status').html('<h3>Kunne ikke logge inn som '+$('#mail')[0].value+'!</h3><p>'+error.code+': '+error.message+'</p>')
            $('#status').css('color', 'red')
        })
}

$(document).keydown(function(e) {
    if (e.which == 13){
        $("#login").click()
    }
})

