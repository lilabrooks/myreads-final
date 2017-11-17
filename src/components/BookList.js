import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import Shelf from './Shelf'


class BookList extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            })
        })
    }

    onShelfChange = (book, shelf) => {

        const id = book.id
        const currentBooks = [...this.state.books]
        const indexToUpdate = currentBooks.findIndex(book => book.id === id)
        const newBookToUpdate = Object.assign(
            {},
            currentBooks[indexToUpdate],
            {shelf: shelf}
            );

        this.setState({
            books: [...currentBooks.slice(0, indexToUpdate), newBookToUpdate,
                ...currentBooks.slice(indexToUpdate + 1)]
        })

        BooksAPI.update(book, shelf)
    }


    render() {

        let currentlyReadingList = [];
        let wantToReadList = [];
        let readList = [];

        this.state.books.forEach(book => {
            switch(book.shelf) {
                case 'currentlyReading':
                    currentlyReadingList.push(book)
                    break
                case 'wantToRead':
                    wantToReadList.push(book)
                    break
                case 'read':
                    readList.push(book)
                    break
                default:
                    break
            }
        })

        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>

                <div className="list-books-content">
                    {this.state.books.length > 0
                        ? (
                            <div>

                            <Shelf title='Currently Reading' books={currentlyReadingList} onShelfChange={this.onShelfChange}/>

                                <Shelf title='Want To Read' books={wantToReadList} onShelfChange={this.onShelfChange}/>

                                    <Shelf title='Read' books={readList} onShelfChange={this.onShelfChange}/>

                        </div>
                        )
                        :
                        (<div className="empty-search">Please enter a valid search term...</div>)
                    }
                </div>


                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookList