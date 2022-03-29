
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

