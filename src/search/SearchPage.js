import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../sharedComponents/BooksAPI';
import './SearchPage.css';
import BooksList from '../sharedComponents/BooksList';
import SearchBooksInput from './SearchBooksInput';

class SearchPage extends Component {
  state = {
    booksResult: [],
  }

  shouldComponentUpdate(nextProps, nextState) {
    // check if next state changed
    if(nextState.booksResult.length === this.state.booksResult.length) {
      for (let i = 0; i < nextState.booksResult.length; i++) {
        if (nextState.booksResult[i].id !== this.state.booksResult[i].id) {
          return true;
        }
      }
    } else {
      return true;
    }

    // check if next props changed
    if(nextProps.allBooks.length === this.props.allBooks.length) {
      for (let i = 0; i < nextProps.allBooks.length; i++) {
        if (nextProps.allBooks[i].id !== this.props.allBooks[i].id){
          return true;
        } else {
          if (nextProps.allBooks[i].shelf !== this.props.allBooks[i].shelf) {
            return true;
          }
        }
      }
    } else {
      return true;
    }
    return false;
  }

  static getDerivedStateFromProps(props, state) {
    // update shelf for books result
    if (state.booksResult.length >0 ) {
      return {
        booksResult: state.booksResult.map((entry) => {
          const index = props.allBooks.findIndex(book => book.id === entry.id);
          if (index !== -1) {
              entry.shelf = props.allBooks[index].shelf;
          } else {
              entry.shelf = 'none';
          }
          return entry;
        })
      };
    }
    return null;
  }

  retrieveBooks = query => {
    if(query) {
      BooksAPI.search(query).then((result)=> {
        if (result.error) {
          this.setState({
            booksResult: []
          })
        } else {
          this.setState({
            booksResult: result.map((entry) => {
              const index = this.props.allBooks.findIndex(book => book.id === entry.id);
              if (index !== -1) {
                entry.shelf = this.props.allBooks[index].shelf;
              } else {
                entry.shelf = 'none';
              }
              return entry;
            })
          })
        }
      })
    } else {
        this.setState({
          booksResult: []
        })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <SearchBooksInput retrieveBooks={this.retrieveBooks}/>
        </div>
        <div className="search-books-results">
          <BooksList onSelectChange={this.props.onSelectChange} books={this.state.booksResult} />
        </div>
      </div>
    )
  }
}

export default SearchPage;
