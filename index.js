require('dotenv').config()
const server = require('./server/server.js');
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

const { MONGO_PASSWORD, MONGO_USER } = process.env

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@graphql-netninja-tutorial-ttzjs.gcp.mongodb.net/test?retryWrites=true&w=majority`)
mongoose.connection.once('open', () => {
	console.log("Connected to MongoDB");
})

server.listen(PORT, () => {
	console.log(`::: Listening on http://localhost:${PORT} :::`);
});

