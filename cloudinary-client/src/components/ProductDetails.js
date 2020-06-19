import React from 'react';
import axios from 'axios';
import PRODUCT_SERVICE from '../services/productService';

class ProductDetails extends React.Component {
  state = {
    title: this.props.location.state.data.title,
    price: this.props.location.state.data.price,
    inStock: this.props.location.state.data.inStock,
    description: this.props.location.state.data.description,
    image: this.props.location.state.data.image,
    productId: this.props.location.state.data._id,
    imageArray: this.props.location.state.data.imageArray
  };

  handleSubmit = event => {
    event.preventDefault();
    const product = this.state;
    console.log('hello: ', product);

    PRODUCT_SERVICE.updateProduct(product.productId, product)
      .then(updatedProduct => {
        const updatedProductInfo = updatedProduct.data;
        this.props.getData();
        this.setState({ updatedProductInfo });
        this.props.history.push(`/`);
      })
      .catch(err => console.log({ err }));
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleCheckboxChange = event => {
    const { name, checked } = event.target;

    this.setState({ [name]: checked });
  };

  handleImageChange = event => {
    const file = event.target.files[0];
    const productId = this.props.location.state.data._id;
    PRODUCT_SERVICE.updateSingleImage(productId, file)
      .then(updatedImage => {
        this.props.getData();
        this.fileInput.value = '';

        const { image } = updatedImage.data;
        this.setState({ image });
      })
      .catch(err => console.log({ err }));
  };

  handleMultiImageChange = event => {
    const { files } = event.target;
    const productId = this.props.location.state.data._id;

    PRODUCT_SERVICE.addMultipleImages(productId, files)
      .then(updatedImages => {
        this.props.getData();

        this.multiFileInput.value = '';

        const { imageArray } = updatedImages.data;
        this.setState({ imageArray });
      })
      .catch(err => console.log({ err }));
  };

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)} className='formDisplay'>
        <img src={this.state.image} style={{ width: '500px', height: '300px' }} alt='Product Image' />

        <input
          id='imageInput'
          type='file'
          name='image'
          onChange={event => this.handleImageChange(event)}
          ref={ref => (this.fileInput = ref)}
        />

        <div>
          {this.state.imageArray.map((image, index) => {
            return (
              <img
                src={image}
                style={{
                  width: '200px',
                  height: '150px',
                  margin: '5px'
                }}
                key={index}
                atl='image{index}'
              />
            );
          })}
        </div>

        <input
          id='imageInput'
          type='file'
          name='images'
          multiple
          onChange={event => this.handleMultiImageChange(event)}
          ref={ref => (this.multiFileInput = ref)}
        />

        <div className='form-inputs'>
          <label>
            <h3>
              Title:
              <input type='text' onChange={event => this.handleChange(event)} name='title' value={this.state.title} />
            </h3>
          </label>
          <label>
            <h4>
              Price:
              <input type='number' onChange={event => this.handleChange(event)} name='price' value={this.state.price} />
            </h4>
          </label>
          <label>
            <h4>
              Description:
              <input
                type='text'
                onChange={event => this.handleChange(event)}
                name='description'
                value={this.state.description}
              />
            </h4>
          </label>
          <label>
            <h4>
              In Stock: {this.state.inStock ? 'Yes' : 'No'}
              <input
                type='checkbox'
                onChange={event => this.handleCheckboxChange(event)}
                name='inStock'
                checked={this.state.inStock}
              />
            </h4>
          </label>
        </div>

        <button>Update</button>
      </form>
    );
  }
}

export default ProductDetails;
