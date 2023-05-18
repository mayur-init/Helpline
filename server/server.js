const express = require('express');
const path = require('path');
const router = require('./routes');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 5000;


// db connection
mongoose.set('strictQuery', true);
mongoose.connect(config.DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log('DB connected...')});
//

// don't disturb the code unless you know how it works
__dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}else{
    app.get('/', (req, res) =>{res.send(`<h2>Express Server is running....</h2>`)})
}
//

app.listen(PORT, () =>{console.log(`listening to port ${PORT}...`)})



