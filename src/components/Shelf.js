import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Shelf extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    render() {
        const title = this.props.title;
        const books = this.props.books;
        const onShelfChange = this.props.onShelfChange;
        
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book, index) => (
                            <Book
                                key={index} 
                                book={book} 
                                onShelfChange={onShelfChange} />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf;