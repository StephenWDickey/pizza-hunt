
// import Types so we can create _id value
const { Schema, model, Types } = require('mongoose');



// import dateFormat function from utils
const dateFormat = require('../utils/dateFormat');


// we will make replies a subdocument of comments
const ReplySchema = new Schema(
    {
        // instead of default _id value, we rename it replyId
        replyId: {
            // we use imported Types to set replyId to
            // type of object id
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String
        },
        writtenBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter for reformatting timestamp
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    // pass in toJSON argument for getters
    {
        toJSON: {
            getters: true
        }
    }
);


const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String
        },
        commentBody: {
            type: String 
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // implement getters to reformat timestamps
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // create association b/w replies and comments
        // instead of 'referring' to replies, we are nesting
        // the replies subdocument within the comment document
        replies: [ReplySchema]
    },
    // we must allow getters for timestamp
    // we must allow virtuals for replies
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

// here we create a virtual for replies!
// the virtual is named replyCount
// it will show us how many replies are 
// attached to some comment
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
})

const Comment = model('Comment', CommentSchema);

module.exports = Comment;