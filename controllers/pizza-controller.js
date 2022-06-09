const { Pizza } = require('../models');

const pizzaController = {

    // get all pizzas
    getAllPizza(req, res) {
        // find() is a mongoose method
        // like Sequelize's findAll()
        Pizza.find({})
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
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
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