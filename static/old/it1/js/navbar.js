
$('#navbar').parent().html(`
<nav class="navbar navbar-expand-sm bg-dark navbar-dark" id="navbar">
    <a class="navbar-brand" href="/it1/">IT1 firebase stuff</a>
    <!-- <ul class="navbar-nav">
        <li class="nav-item right">
            <a class="nav-link" href="/it1/about.html">About</a>
        </li>
    </ul> -->
    <ul class="navbar-nav ml-auto">
        <!-- <li class="nav-item right" id="register-btn">
            <a class="nav-link" href="/register">Register</a>
        </li> -->
        <li class="nav-item right">
            <a class="nav-link" id="login-btn" href="/it1/bruker/"></a>
        </li>
    </ul>
</nav>`)

var signout = function() {
    firebase.auth()
        .signOut()
        .then(function() {
            document.location.href = '/it1/'
        }).catch(function(error) {
            alert('could not log out: '+error.message)
        })
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $('#login-btn').attr('href', 'javascript: signout()')
        $('#login-btn').html('Logout')
    } else {
        $('#login-btn').attr('href', '/it1/bruker/')
        $('#login-btn').html('Login')
    }
})

for (var i = 0; i < $('#navbar').children().length; i++) {
    $('#navbar').children().css('color', 'springgreen')
}

