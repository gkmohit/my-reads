import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'

import Shelf from './Shelf'

class BookShelf extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            });
        });
    }

    changeShelf = (book, shelf) => {
        
        //1. Take a copy of the state.
        const id = book.id;
        const books = [...this.state.books];
        const key = books.findIndex(book => book.id === id);
        //2. Update the object.
        const bookToUpdate = Object.assign({}, books[key], {
            shelf: shelf
        });
        //3. Update state
        this.setState({
            books: [...books.slice(0, key), bookToUpdate, 
            ...books.slice(key + 1)]
        });

        BooksAPI.update(book, shelf);
    }

    render() {
        const { books } = this.state
        
        let currentlyReading = [];
        let wantToRead = [];
        let read = [];

        books.forEach(book => {
            if(book.shelf === 'currentlyReading'){
                currentlyReading.push(book);
            } else if( book.shelf === 'wantToRead' ) {
                wantToRead.push(book)
            } else {
                read.push(book)
            }
        })
        
        const shelf = [
            {
                name: 'Currently Reading',
                books : currentlyReading
            },
            {
                name: 'Want To Read',
                books : wantToRead
            },
            {
                name: 'Read',
                books : read
            }
        ]

        return(
            <div className="list-books-content">
                <div>
                    {shelf.map((shelf, index) => (
                        <Shelf
                            key={index} 
                            title={shelf.name}
                            books={shelf.books} 
                            changeShelf={this.changeShelf}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default BookShelf;