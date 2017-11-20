import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class SearchBook extends Component{

   state = {
      query : "",
      books : []
   }

   searchBooks = (query) =>{
      if( query.length ){
         BooksAPI.search(query, 1).then(response => {
            if( response.error){
               this.setState({
                  books : []
               })
            } else {
               this.setState({
                  books: response
               })
               console.log(this.state.books);
            }
         })
      }
   }
   updateQuery = (query) =>{
      this.setState({query: query.trim()});
      console.log(query);
      this.searchBooks(query);
   }

   clearQuery = () => {
      this.setState({query: ''});
   }

   render() {
      return(
         <div className="search-books">
            <div className="search-books-bar">
               <Link
                  className="close-search"
                  to="/">
                  Close
               </Link>
               <div className="search-books-input-wrapper">
                  {

                  }
                  <input
                     type="text"
                     placeholder="Search by title or author"
                     value={this.state.query}
                     onChange={(event) => this.updateQuery(event.target.value)}
                  />

               </div>
            </div>
            <div className="search-books-results">
               <ol className="books-grid">

               </ol>
            </div>
         </div>
      )
   }
}

export default SearchBook;
