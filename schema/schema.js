const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID , GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;


const Projects = require('../models/project');
const Currencies = require('../models/currency');

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        budget: { type: new GraphQLNonNull(GraphQLInt) },
        currency: {
            type: CurrencyType,
            resolve(parent, args) {
                return Currencies.findById(parent.currencyId);
            }
        },

        // paidStatus
        // start: { type: GraphQLString },
        // deadline: { type: GraphQLString },
        // paid: { type: GraphQLString },
        // debt: { type: GraphQLString },
        // is_archive: { type: GraphQLString }
        // FIXME types. Now the all are strings!
    })
})


const CurrencyType = new GraphQLObjectType({
    name: 'Currency',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        sign: { type: new GraphQLNonNull(GraphQLString) },
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                budget: { type: GraphQLInt },
                currencyId: { type: GraphQLString },
            },
            resolve(parent, args) {
                const project = new Projects({
                    name: args.name,
                    budget: args.budget,
                    currencyId: args.currencyId,
                });
                return project.save();
            }
        },
        deleteProject: {
            type: ProjectType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Projects.findByIdAndRemove(args.id);
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                budget: { type: GraphQLInt },
                currencyId: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Projects.findByIdAndUpdate(
                    args.id,
                    { $set: {
                        name: args.name,
                        budget: args.budget,
                        currencyId: args.currencyId,
                    } },
                    { new: true }
                );
            }
        }
    }
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
            args: { name: { type: GraphQLString } },
            resolve(parent, { name }) {
                return Projects.find({ name: { $regex: name, $options: "i" } });
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
    mutation: Mutation,
})