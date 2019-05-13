const express = require('express');
const app = express();
const port = process.env.PORT || 3000;




app.get('/', function (req, res) {
    res.status(200)
    res.send('Root route is working ');

});

app.listen(port, function () {
    console.log('Server is running on localhost:', port);
})