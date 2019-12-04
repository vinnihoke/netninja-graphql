const graphql = require('graphql');
const _ = require('lodash');

// This will describe the data on the graph, and how to interact with it.

// I couldn't load in 'as' something else.
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

var books = [
	{ name: "Book1", genre: "Fantasy", id: '1' },
	{ name: "Book2", genre: "Fiction", id: '2' },
	{ name: "Book3", genre: "Non-fiction", id: '3' }
]

// Creating an object type.
const BookType = new GraphQLObjectType({
	name: 'Book',
	// He specifically used the ES6 function.
	fields: () => ({
		id: { type: GraphQLString},
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	})
})

// We now need to add the root queries.

// This is the Query from the front end.
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			// We're expecting that they'll pass in this id when they are looking for a specific book.

			// book(id:'123'){
				// 	name
				// 	genre
				// }
			args: {
				id: { type: GraphQLString }
			},
			resolve(parent, args){
				// Code to get data from db / other source
				// Parent comes into play when we look at relationships. We now need to tell graphQL what to do when someone makes this request. Doesn't matter where this data is stored, but this is where we would pull it... i.e. MongoDB or sqlite3.
				
				// Here we're using lodash to check for any book with an id of args.id
				_.find(books, { id: args.id });
			}
		}
	}
});

// Exporting the new schema and telling it which query to use.
module.exports = new GraphQLSchema({ query: RootQuery })
