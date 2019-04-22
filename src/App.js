import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import './Grid.css';
import Category from "./category/Category";
import Cart from "./cart/Cart";
import Product from "./product/Product";
import Header from "./header/Header";
//
// redux

import { Provider } from 'react-redux';
import { store } from './redux/store';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Route exact path="/" component={Category} />
            <Route path="/cart" component={Cart}/>
            <Route path="/product/:id" component={Product}/>
          </BrowserRouter>
        </Provider>
       </div>
    );
  }
}

export default App;
