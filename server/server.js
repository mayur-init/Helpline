const express = require('express');
const path = require('path');
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 5000;

__dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}else{
    app.get('/', (req, res) =>{res.send(`<h2>Express Server is running....</h2>`)})
}

app.listen(PORT, () =>{console.log(`listening to port ${PORT}...`)})