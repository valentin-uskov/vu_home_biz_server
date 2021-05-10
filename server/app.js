const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(`mongodb+srv://root:root@localhost/home_biz?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });

const app = express();
const PORT = 3005;


app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const seedDatabase = async dbConnection => {
    const currenciesCollection = mongoose.connection.collection('currencies');

    if (await currenciesCollection.countDocuments() === 0) {

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

        console.log("Currencies was added");
    }

    const projectsCollection = mongoose.connection.collection('projects');

    if (await projectsCollection.countDocuments() === 0) {
        const Currency = mongoose.model('Currency');
        const defaultCurrency = await Currency.findOne().sort({ $natural: 1 }).limit(1);

        await projectsCollection.insertOne({
            name: 'Initial project',
            budget: 1000,
            currencyId : defaultCurrency.id
        });

        console.log("Initial project was added");
    }

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