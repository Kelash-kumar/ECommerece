
const express = require('express');
const {authenticateToken,authorizeRole} = require('../middlewares/AuthMiddleware');
const {AddProduct,GetAllProduct,GetProduct,UpdateProduct,DeleteProduct} = require('../controllers/ProductController')
const Router = express.Router();

Router.route('/').get(authenticateToken,GetAllProduct);
Router.route('/:id').get(authenticateToken,GetProduct);
Router.route('/').post(authenticateToken,authorizeRole('admin'),AddProduct);
Router.route('/:id').put(authenticateToken,authorizeRole('admin'),UpdateProduct);
Router.route('/:id').delete(authenticateToken,authorizeRole('admin'),DeleteProduct);

module.exports = Router;