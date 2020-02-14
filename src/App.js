import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './sharedComponents/BooksAPI';
import './App.css';
import SearchPage from './search/SearchPage';
import MainPage from './main/MainPage';

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books: books
        })
      })
  }

  onSelectChange = (book, shelf) => {
    const alteredBook = {...book, shelf: shelf };
    if (shelf !== 'none') {
      this.setState((prevState) => ({
        books: [...prevState.books.filter((book) => { return book.id !== alteredBook.id }), alteredBook]
      }));
    } else {
      this.setState((prevState) => ({
        books: [...prevState.books.filter((book) => { return book.id !== alteredBook.id })]
      }));
    }
    BooksAPI.update(book, shelf);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ () => (
          <MainPage onSelectChange={this.onSelectChange} allBooks={this.state.books}/>
        )} />
        <Route path='/search' render={ ({ history, location }) => (
          <SearchPage onSelectChange={this.onSelectChange} allBooks={this.state.books}/>
        )} />
      </div>
    )
  }
}

export default BooksApp;
