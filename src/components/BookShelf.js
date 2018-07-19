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
            })
        })
    }

    onShelfChange = (book, shelf) => {
        
        const id = book.id
        const currentBooks = [...this.state.books]
        const key = currentBooks.findIndex(book => book.id === id)
        const newBookToUpdate = Object.assign({}, currentBooks[key], {
            shelf: shelf
        });

        this.setState({
            books: [...currentBooks.slice(0, key), newBookToUpdate, 
            ...currentBooks.slice(key + 1)]
        })

        BooksAPI.update(book, shelf)
    }

    render() {
        const { books } = this.state
        
        let currentList = [];
        let wantList = [];
        let readList = [];

        books.forEach(book => {
            if(book.shelf === 'currentlyReading'){
                currentList.push(book);
            } else if( book.shelf === 'wantToRead' ) {
                wantList.push(book)
            } else {
                readList.push(book)
            }
        })
        
        const shelfList = [
            {
                name: 'Currently Reading',
                books : currentList
            },
            {
                name: 'Want To Read',
                books : wantList
            },
            {
                name: 'Read',
                books : readList
            }
        ]

        return(
            <div className="list-books-content">
                <div>
                    {shelfList.map((shelf, index) => (
                        <Shelf
                            key={index} 
                            title={shelf.name}
                            books={shelf.books} 
                            onShelfChange={this.onShelfChange}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default BookShelf;