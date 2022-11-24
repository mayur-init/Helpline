const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	API_KEY,
	DB_URL,
	NODE_ENV,
} = process.env;