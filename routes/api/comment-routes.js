
const router = require('express').Router();


// importing the comment controller functions
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');


// /api/comments/pizzaId
router
    .route('/:pizzaId')
    // we pass in comment-controller function
    .post(addComment);


// /api/comments/pizzaId/commentId
router
    .route('/:pizzaId/:commentId')
    // we create put request for replies
    .put(addReply)
    // we pass in comment-controller function
    .delete(removeComment);

// we create a new route for deleting replies because
// we need the reply id in the endpoint as well
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);


module.exports = router;