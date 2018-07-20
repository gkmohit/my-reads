import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {

    static propType = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func
    }

    render() {
        
        let thumbnail;
        if( !this.props.book.imageLinks){
            thumbnail = "https://vignette.wikia.nocookie.net/lego/images/a/a8/No-Image-Basic.gif/revision/latest?cb=20130819000750";
        } else {
            thumbnail = this.props.book.imageLinks.thumbnail
        }

        return(
            <div className="book">
                <div className="book-top">
                    <div 
                        className="book-cover" 
                        style={{ 
                            width: 128, 
                            height: 193, 
                            backgroundImage: `url(${
                                thumbnail
                            })`}}>                        
                    </div>
                    <div className="book-shelf-changer">
                        <select 
                            value={this.props.book.shelf}
                            onChange={event => this.props.changeShelf(this.props.book, event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        )
    }
}



export default Book