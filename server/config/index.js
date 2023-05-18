const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	DB_URL,
	NODE_ENV,
	JWT_SECRET,
	REFRESH_SECRET,
} = process.env;