import React, { Component } from 'react';
import './BooksShelf.css';
import BooksList from '../sharedComponents/BooksList';

class BooksShelf extends Component {
  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, cat) => {
    const book = e.dataTransfer.getData("book");
    this.props.onSelectChange(JSON.parse(book), cat);
  }

  render() {
    const {title, id, shelfBooks, onSelectChange} = this.props;
    return (
      <div className="bookshelf" onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>{this.onDrop(e, id)}}>
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <BooksList onSelectChange={onSelectChange} books={shelfBooks} />
        </div>
      </div>
    );
  }
}

export default BooksShelf;