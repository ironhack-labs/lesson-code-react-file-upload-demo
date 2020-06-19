const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');
const uploadCloud = require('../configs/cloudinary-setup');

// Product Main Info
router.post('/products/create', uploadCloud.single('image'), (req, res, next) => {
  const productInputInfo = req.body;
  productInputInfo.image = req.file.path;

  Product.create(productInputInfo)
    .then(newlyCreatedProduct => res.status(200).json(newlyCreatedProduct))
    .catch(err => res.status(400).json(err));
});

// Product List Route
router.get('/products', (req, res, next) => {
  Product.find()
    .then(productsFromDB => res.status(200).json(productsFromDB))
    .catch(err => req.status(500).json(err));
});

// Product Details
router.get('/products/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(productFromDB => res.status(200).json(productFromDB))
    .catch(err => req.status(400).json(err));
});

// Update Product
router.put('/products/:productId', (req, res, next) => {
  Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })
    .then(updatedProduct => res.status(200).json(updatedProduct))
    .catch(err => req.status(400).json(err));
});

// Delete Product
router.delete('/products/:productId', (req, res, next) => {
  Product.findByIdAndDelete(req.params.productId)
    .then(() =>
      res.status(200).json({
        message: 'Product successfully deleted.'
      })
    )
    .catch(err => req.status(400).json(err));
});

module.exports = router;
