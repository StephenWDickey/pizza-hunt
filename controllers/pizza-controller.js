const { Pizza } = require('../models');

const pizzaController = {

    // get all pizzas
    getAllPizza(req, res) {
        // find() is a mongoose method
        // like Sequelize's findAll()
        Pizza.find({})
            // the .populate() method will show us
            // the comment data
            .populate({
                // use the key 'path' and make value
                // equal to comments
                path: 'comments',
                // select is saying that we DON'T want
                // to return the __v field
                // the minus sign says we don't want this
                // this is the __v for the comment document
                select: '-__v'
            })
            // now we want to get rid of __v for the pizza document
            .select('-__v')
            // we can return pizza data with Mongoose's .sort() method
            // here we are sorting in DESC order, newest pizza first
            .sort( { _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one pizza
    getPizzaById({ params }, res) {
        // findOne() is a mongoose method
        // instead of using req, we destructure
        // params
        Pizza.findOne({ _id: params.id })
            // we add comment data to pizza GET request
            .populate({
                path: 'comments',
                // remove __v value for comments
                select: '-__v'
            })
            // remove __v value for pizza 
            .select('-__v')
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({message: 'No pizza found with this id!'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // post a pizza
    // again we have destructured body from req
    createPizza({ body }, res) {
        // create() is a mongoose method
        // mongoDB uses insertOne(), insertMany()
        // but mongoose just uses create()!
        Pizza.create(body)
            // MongoDB returns an _id value
            // you can override this name to whatever you want
            // __v field is a version tracking tool
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // PUT a pizza
    updatePizza({ params, body }, res) {
        // we use findOneAndUpdate() method
        // we must specify { new: true }
        // so that it returns the updated version
        // updateOne() and updateMany() will update
        // documents but not return them 
        // in sequelize we would put new data, then the params
        // in mongoose we start the 'where' clause first
        // the 'where' being _id: params.id
        // then we do the updated data
        // then the options for the data
        // we must also set runValidators: true
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: 'No pizza found with this id. '});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE a pizza
    deletePizza({ params }, res) {
        // findOneAndDelete() mongoose method
        // deleteOne() and deleteMany() delete but dont return
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id.' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;