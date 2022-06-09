const router = require('express').Router();

const pizzaRoutes = require('./pizza-routes');

// pizza endpoints with have /pizzas after api
router.use('/pizzas', pizzaRoutes);

module.exports = router;