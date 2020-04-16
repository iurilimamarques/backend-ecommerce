const express = require('express');
const UserController = require('./controllers/UserController');
const SellerController = require('./controllers/SellerController');
const ProductController = require('./controllers/ProductController');

const auth = require('./middleware/auth');

const routes = express.Router();

routes.post('/user/create', UserController.createUser);
routes.post('/user/login', UserController.loginUser);

routes.post('/seller/create', SellerController.createSeller);
routes.post('/seller/login', SellerController.loginSeller);
routes.get('/seller/products/:i_vendedor', auth, SellerController.getProducts);

routes.post('/product/create', auth, ProductController.createProduct);
routes.get('/product', ProductController.getProducts);
routes.get('/product/:i_produto', auth, ProductController.getProduct);

module.exports = routes;
