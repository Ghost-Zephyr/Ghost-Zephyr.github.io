
class Comment {
    constructor(name, message, id=0) {
        this.name = name,
        this.message = message,
        this.cfid = id
    }
    toString() {
        return this.name+': '+this.message
    }
    toHtml(user) {
        return '<p id="kommentar">'+this.name+': '+this.message
            +(user?' &nbsp; <a class="btn btn-primary" href="javascript: remove(\''+this.cfid+'\')">Slett</a>':'')+'</p>'
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

