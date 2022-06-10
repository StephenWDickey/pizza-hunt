
// we need to import both models because comments
// are attached to the pizza model
const { Comment, Pizza } = require('../models');


// we dont need to create all CRUD ops, 
// just add and delete comments

const commentController = {
    
    
    addComment({ params, body}, res) {
        console.log(body);
        Comment.create(body)

            // we get the comment's id from mongodb db
            .then(({_id}) => {
                // then we add a comment to the pizza
                // remember with NoSQL we pass in
                // the 'where' first, then the data,
                // finally we specify new: true to return
                // the new data
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    // MongoDB based functions get '$' prefix
                    { $push: { comments:_id} },
                    { new: true }
                );

            })
            // after we add a comment to the pizza, 
            // we send the pizza data back as json object
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id.'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },


    removeComment({ params }, res) {

        // we delete the comment
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deletedComment => {
                if (!deletedComment) {
                    return res.status(404).json({ message: 'No comment with this id.'});
                }

                // we use the comment _id to remove the comment
                // from the pizza model as well
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    // use the MongoDB function $pull
                    { $pull: { comments: params.commentId } },
                    { new: true }
                );
            })

            // we return the pizza data as json
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id.'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));

    }
};

module.exports = commentController;