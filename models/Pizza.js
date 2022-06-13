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
            type: String,
            // adding validation
            // instead of true we can also input a string/
            // message for the user when they havent input
            required: true,
            trim: true
        },
        createdBy: {
            type: String,
            // adding validation
            required: true,
            trim: true
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
            // again adding validation
            required: true,
            // enum = enumerable
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
            default: 'Large'
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
    // we get comments for pizza, we also attach subdocument of comments
    // so we can see the replies as well!
    // the reduce() method takes the total 
    // reduce() has two parameters (accumulator, currentValue)
    // accumulator = total, currentValue = comment
    return this.comments.reduce((total, comment) => total + comment.replies.length +1, 0);
})

// here we 'create' the model, we name it pizza
// we pass our schema into the model
const Pizza = model('Pizza', PizzaSchema);

// now we export our model

module.exports = Pizza;