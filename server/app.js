const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

 mongoose.connect(`mongodb+srv://vu_home_biz:h0Me20bU21v@cluster0.gk2m3.mongodb.net/home_biz?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });
// mongoose.connect(`mongodb+srv://root:root@localhost/home_biz?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });

const app = express();
const PORT = 3005;


app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const seedDatabase = async dbConnection => {
    const currenciesCollection = mongoose.connection.collection('currencies');
    if(await currenciesCollection.count() != 0) return;

    console.log("Test data was added")

    await currenciesCollection.insertOne({
        name: "USD",
        sign: "$"
    });

    await currenciesCollection.insertOne({
        name: "EUR",
        sign: "€"
    });

    await currenciesCollection.insertOne({
        name: "UAH",
        sign: "₴"
    });
}

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error ${err}`));
dbConnection.once('open', () => {
    console.log(`Connected to DATA BASE`);
    seedDatabase(dbConnection);
});


app.listen(PORT, err => {
    err ? console.log(error) : console.log(`Server started`);
})