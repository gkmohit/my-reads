import React from 'react';
import BookShelf from './BookShelf';
import './App.css';
import { Route } from 'react-router-dom';
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  state = {

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
