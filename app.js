const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewear/jwt.middlewear')
const productRoutes = require('./routes/products.route');
const categoryRoutes = require('./routes/category.route');
const cartRoutes = require('./routes/cart.route');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');

const app = express();
const port = 3000;

// Connect to MongoDB 
//using mongo atlas cloud 
//change this password with atlas cloud password
mongoose.connect('mongodb+srv://link2hamxa:<Password>@cluster0.7nworlt.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware to parse JSON
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/product',auth.verifyToken, productRoutes);
app.use('/category',auth.verifyToken, categoryRoutes);
app.use('/cart',auth.verifyToken, cartRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});