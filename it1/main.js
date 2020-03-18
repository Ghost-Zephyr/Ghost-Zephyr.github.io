
var ocontent = $("#content").html()

function reset() {
    $("#content").html(ocontent)
}

function oppgaver() {
    $("#content").html(`
        <h3><a href="/it1/bibliotek/index.html">Bibliotek</a></h3>
    `)
}
