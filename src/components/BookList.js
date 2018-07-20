import React, { Component } from 'react'

import BookShelf from './BookShelf'
import SearchBook from './SearchBook'

class BookList extends Component {
    render() {
        return(
            <div className="list-books">
                <BookShelf /> 
                <SearchBook />
            </div>
        )
    }
}

export default BookList;