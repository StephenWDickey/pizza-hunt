const router = require('express').Router();

const pizzaRoutes = require('./pizza-routes');

const commentRoutes = require('./comment-routes');

// pizza endpoints with have /pizzas after api
router.use('/pizzas', pizzaRoutes);

// comment endpoints will start with /comments
router.use('/comments', commentRoutes);

module.exports = router;