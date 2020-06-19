import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3001/api'
});

const PRODUCT_SERVICE = {
  listAllProducts: () => {
    return new Promise((resolve, reject) => {
      service
        .get('/products')
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    });
  },

  deleteProduct: productId => {
    return new Promise((resolve, reject) => {
      service
        .delete(`/products/${productId}`)
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    });
  },

  createProduct: product => {
    return new Promise((resolve, reject) => {
      const uploadData = new FormData();

      uploadData.append('image', product.image);
      uploadData.append('title', product.title);
      uploadData.append('price', product.price);
      uploadData.append('inStock', product.inStock);
      uploadData.append('description', product.description);
      service
        .post('/products/create', uploadData, { withCredentials: true })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  },

  updateProduct: (id, product) => {
    return new Promise((resolve, reject) => {
      service
        .put(`/products/${id}`, product, { withCredentials: true })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  },

  updateSingleImage: (id, imageFile) => {
    return new Promise((resolve, reject) => {
      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      service
        .patch(`/products/image/${id}`, uploadData, { withCredentials: true })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  },

  addMultipleImages: (id, images) => {
    return new Promise((resolve, reject) => {
      const uploadData = new FormData();

      for (let i = 0; i < images.length; i++) {
        uploadData.append('imageArray', images[i]);
      }
      service
        .patch(`/products/imageArray/${id}`, uploadData, { withCredentials: true })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }
};

export default PRODUCT_SERVICE;
