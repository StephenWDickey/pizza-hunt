// import the Schema constructor and model
// function of mongoose
const { Schema, model } = require('mongoose');

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
            default: Date.now
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
    {
        toJSON: {
            virtuals: true,
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