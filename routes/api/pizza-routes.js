const router = require('express').Router();

// we need to import our controllers!
// instead of importing the entire file
// we destructure the methods we created
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// unlike before where we would create each route
// for each crud operation, we can combine them!

// routes for ALL pizzas
// we pass in our callback functions
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

// routes for INDIVIDUAL pizzas
router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);


module.exports = router;