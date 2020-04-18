var mongoose = require('mongoose');

const db_url = 'mongodb+srv://*******:*******@wsa-cluster-eqwiq.mongodb.net/wsa?retryWrites=true&w=majority';

mongoose.connect(db_url,{ useUnifiedTopology: true, useNewUrlParser: true}, ()=>{
    console.log('connected to small db');
})
mongoose.connection.on('error', (err)=>{
    console.log('err', err);
})

module.exports.mongoose;
