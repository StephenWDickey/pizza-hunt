// import the Schema constructor and model
// function of mongoose
const { Schema, model } = require('mongoose');


//import dateFormat function from utils
const dateFormat = require('../utils/dateFormat');


// create our model schema
const PizzaSchema = new Schema(
    {
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
            default: Date.now,
            // here is our getter to reformat timestamp
            // we use our dateFormat functions from utils
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            deafult: 'Large'
        },
        toppings: [],
        // we create an association to comments
        // by adding this array to the schema
        comments: [
            {
                type: Schema.Types.ObjectId,
                // here we connect the pizza model
                // to the comment document
                ref: 'Comment' 
            }
        ]
    },
    // we pass second object
    // this will allow use of virtuals
    // we also allow use of getters
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// here we create a virtual for comments!
// the virtual is named commentCount
// it will show us how many comments are 
// attached to some pizza
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
})

// here we 'create' the model, we name it pizza
// we pass our schema into the model
const Pizza = model('Pizza', PizzaSchema);

// now we export our model

module.exports = Pizza;