
const router = require('express').Router();


// importing the comment controller functions
const { addComment, removeComment } = require('../../controllers/comment-controller');


// /api/comments/pizzaId
router
    .route('/:pizzaId')
    // we pass in comment-controller function
    .post(addComment);


// /api/comments/pizzaId/commentId
router
    .route('/:pizzaId/:commentId')
    // we pass in comment-controller function
    .delete(removeComment);


module.exports = router;