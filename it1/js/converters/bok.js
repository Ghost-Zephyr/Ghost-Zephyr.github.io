
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
    toHtml(elm) {
        let span = function(selector, string, p, color='red') {
            $($(selector)[$(selector).length-1]).append('<span style="color: '+color+'"></span>')
            $($(selector+' > span')[$(selector+' > span').length-1]).text(string)
            $($(selector)[$(selector).length-1]).append(p)
        }
        elm.append('<p class="book"></p>')
        span('.book', this.title, ' av ')
        span('.book', this.author, ', terningkast ')
        span('.book', this.rating, ', utgitt ')
        span('.book', this.published.toString().slice(0,15), ', forlag: ', 'green')
        span('.book', this.publisher, firebase.auth().currentUser?' &nbsp; <a class="btn btn-primary" href="javascript: remove(\''+this.cfid+'\')">Slett</a>':'', 'yellow')
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

