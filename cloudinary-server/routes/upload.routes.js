const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');
const uploadCloud = require('../configs/cloudinary-setup');

// Single image upload
router.patch('/products/image/:productId', uploadCloud.single('image'), (req, res, next) => {
  Product.findByIdAndUpdate(req.params.productId, { image: req.file.path }, { new: true })
    .then(updatedProduct => res.status(200).json(updatedProduct))
    .catch(err => res.status(400).json(err));
});

// Multiple images upload
router.patch('/products/imageArray/:productId', uploadCloud.array('imageArray'), (req, res, next) => {
  Product.findById(req.params.productId)
    .then(productFromDB => {
      req.files.forEach(file => productFromDB.imageArray.push(file.path));

      productFromDB
        .save()
        .then(updatedProduct => res.status(200).json(updatedProduct))
        .catch(err => res.status(400).json({ message: `Error pushing urls:${err}` }));
    })
    .catch(err => res.status(400).json({ message: `Error finding product: ${err}` }));
});

module.exports = router;
