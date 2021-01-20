const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(`mongodb+srv://vu_home_biz:h0Me20bU21v@cluster0.gk2m3.mongodb.net/home_biz?retryWrites=true&w=majority`,  { useUnifiedTopology: true, useNewUrlParser: true } );

const app = express();
const PORT = 3005;


app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));


const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error ${err}`));
dbConnection.once('open', () => console.log(`Connected to DATA BASE`));


app.listen(PORT, err => {
    err ? console.log(error) : console.log(`Server started`);
})