import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {

    state = {
        books: [],
        searchResults: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                const booksId = books.map(book => ({ id: book.id,shelf: book.shelf }))
                this.setState({ searchResults: booksId })
            })
    }

    onSearch = (query) => {
        if(query) {
            BooksAPI.search(query).then(books => {
              books ? this.setState({ books: books }) : this.setState({ books: [] })
            })
        } else {
            this.setState( { books: [] })
        }
    }

    onShelfChange = (book, shelf) => {
        const newBooks = []
        BooksAPI.update(book, shelf)
            .then(books => {
                Object.keys(books)
                    .forEach(shelf => {
                        return books[shelf].map(id => ({ id: id, shelf: shelf}))
                            .forEach(book => {
                                newBooks.push(book)
                            })
                    })
                return newBooks
            })
            .then(newBooks => {
                this.setState({ searchResults: newBooks })
            })
    }

    render() {

        let booksList

        if (this.state.books.length > 0) {
            booksList = this.state.books.map((book, index) => {
                this.state.searchResults.forEach(s => {
                    if(s.id === book.id) {
                        book.shelf = s.shelf
                    }
                })

               return (
                    <li key={index}>
                        <Book
                            onShelfChange={this.onShelfChange}
                            book={book} />
                    </li>
                )
            })
        } else {
            booksList = null
        }

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            onChange={ (event) => this.onSearch(event.target.value) }
                            placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksList}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks