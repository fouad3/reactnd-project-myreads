import React from 'react';
import './BooksList.css';
import BookItem from './BookItem';

const BooksList = (props) => {
  return (
    <ol className="books-grid">
      {
        props.books.map((book) => {
          return (
            <BookItem key={book.id} book={book} onSelectChange={props.onSelectChange} />
          )
        })
      }
    </ol>
  );
}

export default BooksList;