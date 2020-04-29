// lib/app.ts
import express = require('express');
import * as bodyParser from "body-parser";
var cors = require('cors');

// Create a new express application instance
const app: express.Application = express();
app.options('*', cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.get('/api/hello', (req, res, next) => {
    res.send("Hello from cogito!");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

