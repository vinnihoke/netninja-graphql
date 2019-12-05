const graphql = require('graphql');
const _ = require('lodash');

// This will describe the data on the graph, and how to interact with it.

// I couldn't load in 'as' something else.
const { 
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = graphql;

var books = [
	// Note: ID's must be stored as strings. This is JSON
	{ name: "Book 1", genre: "Fantasy", id: "1", authorId: '2' },
	{ name: "Book 2", genre: "Fiction", id: "2", authorId: '2' },
	{ name: "Book 3", genre: "Non-fiction", id: "3", authorId: '3' },
	{ name: "Book 4", genre: "History", id: "4", authorId: '3' },
	{ name: "Book 5", genre: "Scifi", id: "5", authorId: '1' },
	{ name: "Book 6", genre: "Non-fiction", id: "6", authorId: '2' }
]

// We want to bind authorId of the book, we can tag that to the actual author.

var authors = [
	{ name: "Author 1", age: "34", id: "1" },
	{ name: "Author 2", age: "55", id: "2" },
	{ name: "Author 3", age: "72", id: "3" },
]

// Creating an object type.
const BookType = new GraphQLObjectType({
	name: 'Book',
	// He specifically used the ES6 function.
	// These must be wrapped inside a function because they aren't ran right away. Otherwise, you'd get an error because stuff would be undefined.
	fields: () => ({
		id: { type: GraphQLID},
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args){
				console.log(parent);
				return _.find(authors, { id: parent.authorId });
			}
		}
	})
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	// He specifically used the ES6 function.
	fields: () => ({
		id: { type: GraphQLID},
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args){
				return _.filter(books, { authorId: parent.id })
			}
		}
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
				id: { type: GraphQLID }
			},
			resolve(parent, args){
				// Code to get data from db / other source
				// Parent comes into play when we look at relationships. We now need to tell graphQL what to do when someone makes this request. Doesn't matter where this data is stored, but this is where we would pull it... i.e. MongoDB or sqlite3.
				
				// Here we're using lodash to check for any book with an id of args.id. Research lodash.


				return _.find(books, { id: args.id });
			}
		},
		// Book end, starting authors query
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args){
				return _.find(authors, { id: args.id });
			}
		},
		// We need to pull all the books. Simply return the full list of books, or authors
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args){
				return books
			}
		},

		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, arge){
				return authors
			}
		}
	}
});

// Exporting the new schema and telling it which query to use.
module.exports = new GraphQLSchema({ query: RootQuery })
