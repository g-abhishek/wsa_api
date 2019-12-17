var mongoose = require('mongoose');

const db_url = 'mongodb+srv://abhishek:abhishek@wsa-cluster-eqwiq.mongodb.net/wsa?retryWrites=true&w=majority';

mongoose.connect(db_url,{ useUnifiedTopology: true, useNewUrlParser: true}, ()=>{
    console.log('connected to db');
})
mongoose.connection.on('error', (err)=>{
    console.log('err', err);
})

module.exports.mongoose;