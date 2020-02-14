import React, { Component } from 'react';
import './BookItem.css';

class BookItem extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  handleChange = () => {
    this.props.onSelectChange(this.props.book, this.myRef.current.value);
  }

  onDragStart = (e, book) => {
    e.dataTransfer.setData("book", JSON.stringify(book));
  }

  render() {
    const { book } = this.props;
    return (
      <li draggable onDragStart = {(e) => this.onDragStart(e, book)}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
            <select ref={this.myRef} value={book.shelf} onChange={this.handleChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }
}

export default BookItem;
