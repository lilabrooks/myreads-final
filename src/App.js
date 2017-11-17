import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookList from './components/BookList'
import SearchBooks from './components/SearchBooks'

import './App.css'

class BooksApp extends Component {
  render () {
    return (
      <div className="app">
        <Route exact path="/" component={BookList} />
        <Route path="/search" component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
