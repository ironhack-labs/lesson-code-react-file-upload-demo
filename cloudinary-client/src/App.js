import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

import PRODUCTS_SERVICE from './services/productService';

class App extends React.Component {
  state = {
    allProducts: null
  };

  componentDidMount() {
    this.getData();
  }

  // here we are setting a method that will get the updated data from our API in order to call upon it after every change that we make to initial list. (ie: deleting an item, adding as item, updating an item, etc.). we will also use this in order to call it once the component loads in order to get the current list of products from our API
  getData = () => {
    PRODUCTS_SERVICE.listAllProducts()
      .then(allProducts => this.setState({ allProducts }))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className='App'>
        <NavBar />
        <Switch>
          <Route
            exact
            path='/'
            render={props => <ProductList {...props} getData={this.getData} allProducts={this.state.allProducts} />}
          />
          <Route exact path='/products/:id' render={props => <ProductDetails {...props} getData={this.getData} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
