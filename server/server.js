const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema.js');


const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use('/graphql', graphqlHTTP({
	// You must pass in a schema on how our graph will look. What datatypes are on the graph, how are they structured, and how are they related? 
	// We'll be pulling from the schema.js file inside schema folder.
	schema
}))

module.exports = server;
