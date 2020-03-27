
class Comment {
    constructor(name, message) {
        this.name = name,
        this.message = message
    }
    toString() {
        return this.name+': '+this.message
    }
    toHtml() {
        return '<p id="kommentar">'+this.name+': '+this.message+'</p>'
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
            data.melding
        )
    }
}

