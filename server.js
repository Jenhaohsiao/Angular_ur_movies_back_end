const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const dbConnecter = require('./mongoDB-connect')
const api = require('./APIs/api');

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.status(200);
    res.json({
        message: 'Here is Root',
    }).send();


});

app.listen(port, function () {
    console.log('Server is running on localhost:', port);
})


//When server connect to mongoDB
app.use('/', dbConnecter);
//When server connect to mongoDB -end

app.use('/api', api.router); // When you use Root API
app.use('/api/advertising', api.advertising); // When you use authorize API