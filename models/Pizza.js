// import the Schema constructor and model
// function of mongoose
const { Schema, model } = require('mongoose');

// create our model schema
const PizzaSchema = new Schema({
    pizzaName: {
        // we dont need to import datatypes
        // like we do with Sequelize
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        deafult: 'Large'
    },
    toppings: []
})

// here we 'create' the model, we name it pizza
// we pass our schema into the model
const Pizza = model('Pizza', PizzaSchema);

// now we export our model

module.exports = Pizza;