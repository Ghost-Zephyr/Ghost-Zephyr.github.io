
var db = firebase.firestore()

class Comment {
    constructor(name, message, id=0) {
        this.name = name,
        this.message = message,
        this.cfid = id
    }
    toString() {
        return this.name+': '+this.message
    }
    toHtml(elm) {
        elm.append('<p class="kommentar"></p>')
        $($('.kommentar')[$('.kommentar').length-1]).text(this.toString())
        firebase.auth().currentUser?$($('.kommentar')[$('.kommentar').length-1]).append(' &nbsp; <a class="btn btn-primary" href="javascript: remove(\''+this.cfid+'\')">Slett</a>'):undefined
    }
}

commentConverter = {
    toFirestore: function(comment) {
        return {
            navn: comment.name,
            melding: comment.message
        }
    },
    fromFirestore: function(snapshot, options) {
        const data = snapshot.data(options)
        return new Comment(
            data.navn,
            data.melding,
            snapshot.id
        )
    }
}

var list = function() {
    db.collection('gjestebok')
        .withConverter(commentConverter)
        .get()
        .then(function(query) {
            $('#kommentarer').html('<br/>')
            query.forEach(function(doc) {
                book = doc.data()
                book.toHtml($('#kommentarer'))
            })
        }).catch(function(error) {
            $('#status').html('<h3>Kunne ikke hente kommentarer!</h3><br/><p>'+error.message+'</p>')
            $('#status').css('color', 'red')
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
            $('#kommentarer').html('')
            list()
        }).catch(function() {
            $('#status').html('<p>Problem med å legge til melding med navn '+$('#navn')[0].value+'!</p>')
            $('#status').css('color', 'red')
        })
}

var remove = function(id) {
    db.collection("gjestebok").doc(id)
        .delete().then(function() {
            $('#kommentarer').html('')
            list()
        }).catch(function(error) {
            alert("Error removing document: ", error)
        })
}

list()

