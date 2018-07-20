import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'
import * as BooksAPI from '../BooksAPI'

class BookSearch extends Component {

    state = {
      books: [],
      currentBooks: []
    }

    componentDidMount() {
      BooksAPI.getAll()
        .then(books => {
          const booksId = books.map(book => ({ id: book.id, shelf: book.shelf }));
          this.setState({ currentBooks: booksId });
        })
    }

    search = (event) => {
      if(event.target.value) {
        BooksAPI.search(event.target.value).then(books => {
          if(!books || books.hasOwnProperty('error')) {
            this.setState({ books: null });
          } else {
              this.setState({ books });
          }  
        })
      } else {
        this.setState( { books: null });
      }
    }

    changeShelf = (book, shelf) => {
      const newBooks = [];
      BooksAPI.update(book, shelf)
        .then(books => {
          Object.keys(books)
            .forEach(shelf => {
              return books[shelf].map(id => ({ id: id, shelf: shelf})).forEach(book => {
                newBooks.push(book);
              });
            });
            return newBooks;
        }).then(newBooks => {
          this.setState({ currentBooks: newBooks });
        })
    }
    
 
    render() {
      let booksList;

      if (this.state.books.length > 0) {
        booksList = this.state.books.map((book, index) => {
          this.state.currentBooks.forEach(currentbook => {
            if(currentbook.id === book.id) {
              book.shelf = currentbook.shelf;
            }
          })

          return (
            <li key={index}>
              <Book
                changeShelf={this.changeShelf}
                book={book} />
            </li>
          ) 
        })
      } else {
        booksList = [];
      }

      return(
          <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input 
                type="text" 
                onChange={this.search}
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

export default BookSearch;