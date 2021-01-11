const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID , GraphQLInt, GraphQLList } = graphql;


const Projects = require('../models/project');
const Currencies = require('../models/currency');
const ProjectStatuses = require('../models/projectStatus');

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        budget: { type: GraphQLInt },
        currency: {
            type: CurrencyType,
            resolve(parent, args) {
                return Currencies.findById(parent.currencyId);
            }
        },
        projectStatus: { /* FIXME add to mongoDB and fix output  */
            type: ProjectStatusType,
            resolve(parent, args) {
                return ProjectStatuses.findById(parent.projectStatusId);
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
        name: { type: GraphQLString },
        sign: { type: GraphQLString },
    })
})

const ProjectStatusType = new GraphQLObjectType({
    name: 'ProjectStatus',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
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
        projectStatuses: {
            type: new GraphQLList(ProjectStatusType),
            resolve(parent, args) {
                return ProjectStatuses.find({});
            }
        },
        projectStatus: {
            type: ProjectStatusType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return ProjectStatuses.findById(args.id);
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: Query,
})