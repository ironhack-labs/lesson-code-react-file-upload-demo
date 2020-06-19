import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import PRODUCT_SERVICE from '../services/productService';

class ProductList extends React.Component {
  state = {
    title: '',
    price: 0,
    inStock: false,
    description: '',
    image: '',
    updated: false
  };

  handleSubmit = event => {
    event.preventDefault();
    const product = this.state;

    PRODUCT_SERVICE.createProduct(product)
      .then(response => {
        this.props.getData();
        this.fileInput.value = '';

        this.setState({
          title: '',
          price: 0,
          inStock: false,
          description: ''
        });
      })
      .catch(err => console.log({ err }));
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  // this wil handle changing of true and false value for a checkbox
  // since you have to check the event.target.checked option for true or false.
  // If we just check the event.target.value we will get a value of "on" or "off".
  handleCheckboxChange = event => {
    const { name, checked } = event.target;

    this.setState({ [name]: checked });
  };

  // when the file input changes we have to check for the uploaded info from event.target.files
  // which gives us an array. To submit the file selected you normally get the first element in the array [0].
  // If your doing multiple file uploads then you would just pass the entire array.
  handleImageChange = event => {
    const file = event.target.files[0];

    this.setState({ image: file });
  };

  deleteItem = productId => {
    PRODUCT_SERVICE.deleteProduct(productId)
      .then(() => this.props.getData())
      .catch(err => console.log({ err }));
  };

  viewProducts = () => {
    return this.state.allProducts?.length > 0 ? (
      this.state.allProducts.map(product => {
        const { title, price, description, inStock, _id, image } = product;

        return (
          <div
            key={_id}
            style={{
              borderBottom: '1px solid black'
            }}
          >
            <img src={image} style={{ width: '500px', height: '300px' }} />
            <Link
              to={{
                pathname: `products/${_id}`,
                state: {
                  data: product
                }
              }}
            >
              <h3>Product: {title}</h3>
            </Link>
            <h4>Price: ${price}</h4>
            <h4>Description: {description}</h4>
            <h4>In Stock: {inStock ? 'Yes' : 'No'}</h4>
            <button onClick={() => this.deleteItem(_id)} style={{ marginBottom: '15px' }}>
              X
            </button>
          </div>
        );
      })
    ) : (
      <h2>No Products to Display</h2>
    );
  };

  getProductList = () => {
    if (this.state.allProducts !== this.props.allProducts) {
      this.setState({
        allProducts: this.props.allProducts
      });
    }
  };

  render() {
    return (
      <div className='App'>
        {this.getProductList()}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='titleInput'>Title</label>
          <input
            id='titleInput'
            type='text'
            name='title'
            placeholder='Phone'
            onChange={this.handleChange}
            value={this.state.title}
          />
          <br />

          <label htmlFor='priceInput'>Price</label>
          <input
            id='priceInput'
            type='Number'
            name='price'
            placeholder='500'
            onChange={this.handleChange}
            value={this.state.price}
          />
          <br />

          <label htmlFor='inStockInput'>In Stock?</label>
          <input
            id='inStockInput'
            type='checkbox'
            name='inStock'
            onChange={this.handleCheckboxChange}
            value={this.state.inStock}
          />
          <br />

          <label htmlFor='descriptionInput'>Description</label>
          <input
            id='descriptionInput'
            type='text'
            name='description'
            placeholder='Describe the product in few words'
            onChange={this.handleChange}
            value={this.state.description}
          />
          <br />

          <label htmlFor='imageInput'>Image</label>
          <input
            id='imageInput'
            type='file'
            name='image'
            onChange={this.handleImageChange}
            // here we will use a ref to create a variable fileInput in order to clear the value of the file type input tag once we submit our form.
            // Refs are provided by React to access the DOM element and the React element that you might have created on your own. They are used in cases where we want to change the value of a child component, without making use of props.
            // using refs is not recommended to use, even less than lifecycle methods since using refs is kinda moving little away the react way of thinking which is once state changes, you re-render all the components of your UI that depend on that state.
            // In our case file type input is a non controlled input type and therefor we cannot reset the value using state so this would fall under one of those cases that using ref would not be fround upon.
            ref={ref => (this.fileInput = ref)}
          />
          <br />

          <button>Add Product</button>
        </form>

        <hr />

        {this.state.allProducts && this.viewProducts()}
      </div>
    );
  }
}

export default ProductList;
