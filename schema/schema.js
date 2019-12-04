const graphql = require('graphql');

// This will describe the data on the graph, and how to interact with it.

// I couldn't load in 'as' something else.
const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = new GraphQLObjectType({
	name: 'Book',
	// He specifically used the ES6 function.
	fields: () => ({
		id: { type: GraphQLString},
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	})
})
