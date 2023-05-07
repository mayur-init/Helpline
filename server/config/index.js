const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	RAPID_API_KEY,
	REACT_APP_BACKEND_URL,
	DB_URL,
	NODE_ENV,
	JWT_SECRET,
	REFRESH_SECRET,
} = process.env;