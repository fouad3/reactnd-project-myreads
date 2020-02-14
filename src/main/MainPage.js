import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import BooksShelf from './BooksShelf';

const booksShelves = [
    {title: 'Currently Reading', id: 'currentlyReading'},
    {title: 'Want to Read', id: 'wantToRead'},
    {title: 'Read', id: 'read'}
];

const MainPage = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            props.allBooks.length > 0 && booksShelves.map((shelf) => {
              return (
                <BooksShelf
                  key={shelf.id}
                  title={shelf.title}
                  id={shelf.id}
                  shelfBooks={props.allBooks.filter((book) => {
                  return book.shelf === shelf.id
                  })}
                  onSelectChange={props.onSelectChange}
                />
              )
            })
          }
        </div>
      </div>
      <div className="open-search">
        <Link className="open-search-button" to='/search'></Link>
      </div>
    </div>
  );
}

export default MainPage;
