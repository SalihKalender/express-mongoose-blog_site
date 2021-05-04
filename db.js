const mongoose = require('mongoose');
const uri = process.env.db_URI || 'localhost:'
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once('open',() => {
    console.log('Connnecting Mongoose');
});

db.on('error', console.error.bind(console, 'database error'));
