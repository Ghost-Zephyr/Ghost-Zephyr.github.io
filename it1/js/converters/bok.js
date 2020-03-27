
class Book {
    constructor(title, author, publisher, rating, published, id=0) {
        this.cfid = id
        this.title = title
        this.author = author
        this.publisher = publisher
        this.rating = rating
        this.published = published
    }
    toString() {
        return this.title+' av '+this.author+', terningkast '+this.rating+', utgitt '+this.published.toString().slice(0,15)+', forlag; '+this.publisher
    }
    toHtml(user=false) {
        let span = function(string, color='red') {
            return '<span style="color: '+color+'">'+string+'</span>'
        }
        return '<p>'+span(this.title)+' av '+span(this.author)+', terningkast '+span(this.rating)+', utgitt '
            +span(this.published.toString().slice(0,15), 'green')+', forlag; '+span(this.publisher, 'yellow')
            +(user?' &nbsp; <a class="btn btn-primary" href="javascript: remove(\''+this.cfid+'\')">Slett</a>':'')+'</p>'
    }
}

bookConverter = {
    toFirestore: function(book) {
        let millis = Date.parse(book.published)
        return {
            tittel: book.title,
            forfatter: book.author,
            forlag: book.publisher,
            terningkast: book.rating,
            utgitt: new firebase.firestore.Timestamp(millis/1000, 0)
        }
    },
    fromFirestore: function(snapshot, options) {
        const data = snapshot.data(options)
        return new Book(
            data.tittel,
            data.forfatter,
            data.forlag,
            data.terningkast,
            data.utgitt.toDate(),
            snapshot.id
        )
    }
}

