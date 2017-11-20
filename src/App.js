import React from 'react';
import BookShelf from './BookShelf';
import './App.css';
import { Route } from 'react-router-dom';
import SearchBook from './SearchBook';
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
   state = {
      books : []
   }

   componentDidMount() {
      BooksAPI.getAll().then(data => {
         this.setState({
            books: data

         });
      });
      console.log(this.books);
   }

   render() {
      return (
         <div className="app">
            <Route exact path="/" render={ () => (
               <BookShelf
               />
            )}/>
            <Route path="/search" render={ () => (
               <SearchBook
                  onCreateContact={ (contact) => {
                     //this.createContact(contact)
                     //history.push('/')
                  }}
               />
            )}/>
         </div>
      )
   }
}

export default BooksApp
