const express = require('express');


// we must import mongoose when we start our app!
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));


// now we establish connection to our db
// even if db doesnt exist yet, mongoDB will create one
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-hunt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// we can log our mongo queries
mongoose.set('debug', true);


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
