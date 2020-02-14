import React, { Component } from 'react';
import { debounce } from "throttle-debounce";
import './SearchPage.css';

class SearchBooksInput extends Component {
  constructor(props) {
    super(props);
    this.state = { query: ''}
    // discard all the other delayed executions
    this.retrieveBooksDebounced = debounce(500, this.props.retrieveBooks);
  }

  handleChange = event => {
    this.setState({
      query: event.target.value,
    }, () => {
      this.retrieveBooksDebounced(this.state.query);
    })
  }

  render() {
    return (
      <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>
      </div>
    )
  }
}

export default SearchBooksInput;
