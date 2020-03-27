$('#navbar').parent().html(`
<nav class="navbar navbar-expand-sm bg-dark navbar-dark" id="navbar">
    <a class="navbar-brand g" target="_top" href="/it1/index.html">IT1 firebase stuff</a> <!-- href="/it1/index.html" -->
    <!-- <ul class="navbar-nav">
        <li class="nav-item right">
            <a class="nav-link" target="_top" href="/it1/about.html">About</a>
        </li>
    </ul>
    <ul class="navbar-nav ml-auto">
        <li class="nav-item right">
            <a class="nav-link">Simple login here later</a>
        </li>
        <li class="nav-item right" style="visibility: hidden">
            <a class="nav-link" target="_top" href="/logout">Logout</a>
        </li>
        <li class="nav-item right" id="register-btn">
            <a class="nav-link" target="_top" href="/register">Register</a>
        </li>
        <li class="nav-item right" id="login-btn">
            <a class="nav-link" target="_top" href="/login">Login</a>
        </li>
    </ul> -->
</nav>`)

for (var i = 0; i < $('#navbar').children().length; i++) {
    $('#navbar').children().css('color', 'green')
}

