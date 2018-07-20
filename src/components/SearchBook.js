import React from 'react';
import { Link } from 'react-router-dom';

const SearchBook = () => {
    return(
        <div className="open-search">
            <Link to="/search">Add book</Link>
        </div>
    )
}

export default SearchBook;