
class Book {
    constructor(title, author, publisher, rating, published) {
        this.title = title
        this.author = author
        this.publisher = publisher
        this.rating = rating
        this.published = published.toDate()
    }
    toString() {
        return this.title+' av '+this.author+', ternignkast '+this.rating+', utgitt '+this.published.toString().slice(0,15)+', forlag; '+this.publisher
    }
    toHtml() {
        let span = function(string, color='red') {
            return '<span style="color: '+color+'">'+string+'</span>'
        }
        return '<p>'+span(this.title)+' av '+span(this.author)+', ternignkast '+span(this.rating)+
        ', utgitt '+span(this.published.toString().slice(0,15), 'green')+', forlag; '+span(this.publisher, 'yellow')+'</p>'
    }
}

bookConverter = {
    toFirestore: function(book) {
        return {
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            rating: book.rating,
            published: book.published
        }
    },
    fromFirestore: function(snapshot, options) {
        const data = snapshot.data(options)
        return new Book(data.tittel, data.forfatter, data.forlag, data.terningkast, data.utgitt)
    }
}

