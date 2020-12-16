const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID , GraphQLInt, GraphQLList } = graphql;

const projects = [
    { id: '1', name: 'Init Project', statusId: '2', budget: 1000 },
    { id: 2, name: 'Second Project', statusId: '4', budget: 200 },
    { id: 3, name: 'Third Project', statusId: '3', budget: 375 },
    { id: '4', name: 'Fourth Project', statusId: '1', budget: 17500 },
]

const statuses = [
    { id: '1', name: 'not started' },
    { id: '2', name: 'in pprogress' },
    { id: '3', name: 'frozen' },
    { id: '4', name: 'finished' },
]

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        budget: { type: GraphQLInt },
        status: {
            type: StatusType,
            resolve(parent, args) {
                return statuses.find(status => status.id == parent.statusId);
            }
        },

        // start: { type: GraphQLString },
        // deadline: { type: GraphQLString },
        // paid: { type: GraphQLString },
        // debt: { type: GraphQLString },
        // currency: { type: GraphQLString },
        // paid_status: { type: GraphQLString },
        // is_archive: { type: GraphQLString }
        // FIXME types. now all are strings!
    })
})

const StatusType = new GraphQLObjectType({
    name: 'Status',
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
                return projects.find(project => project.id == args.id);
            }
        },
        status: {
            type: StatusType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return statuses.find(status => status.id == args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projects;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
})