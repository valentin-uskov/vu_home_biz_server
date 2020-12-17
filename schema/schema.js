const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID , GraphQLInt, GraphQLList } = graphql;


const Projects = require('../models/project');
const Currencies = require('../models/currency');

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        budget: { type: GraphQLInt },
        // currencyId: { type: GraphQLID },
        currency: {
            type: CurrencyType,
            resolve(parent, args) {
                // return statuses.find(status => status.id == parent.statusId);
                return Currencies.findById(parent.currencyId);
            }
        },


        // statusId: { type: GraphQLID },
        // start: { type: GraphQLString },
        // deadline: { type: GraphQLString },
        // paid: { type: GraphQLString },
        // debt: { type: GraphQLString },
        // currency: { type: GraphQLString },
        // paid_status: { type: GraphQLString },
        // is_archive: { type: GraphQLString }
        // FIXME types. Now the all are strings!
    })
})

const CurrencyType = new GraphQLObjectType({
    name: 'Currency',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        sign: { type: GraphQLString },
    })
})


const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return projects.find(project => project.id == args.id);
                return Projects.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Projects.find({});
            }
        },
        currencies: {
            type: new GraphQLList(CurrencyType),
            resolve(parent, args) {
                return Currencies.find({});
            }
        },
        currency: {
            type: CurrencyType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return statuses.find(status => status.id == args.id);
                return Currencies.findById(args.id);
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: Query,
})