// lib/app.ts

// @ts-ignore
import  express =  require("express");
// @ts-ignore
import * as bodyParser from "body-parser";
// @ts-ignore
import cors = require('cors');
import * as routes from './routes';
import * as github_keys from './../../../secret/github_api';

// @ts-ignore
process.env.CLIENT_ID = github_keys.CLIENT_ID;
// @ts-ignore
process.env.CLIENT_SECRET = github_keys.CLIENT_SECRET;

// Create a new express application instance
const app: express.Application = express();
app.options('*', cors());
app.use(bodyParser.json() );       // to support JSON-encoded bodies

app.use('/', routes.router);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

