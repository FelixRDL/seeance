// lib/app.ts
// @ts-ignore
import  express =  require("express");
// @ts-ignore
import * as bodyParser from "body-parser";
// @ts-ignore
import cors = require('cors');
import * as routes from './routes';
import {ConfigProvider} from "../../implementation/config/ConfigProvider";

export class Server {

    init() {
        // Create a new express application instance
        const app: express.Application = express();
        app.options('*', cors());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json() );       // to support JSON-encoded bodies

        app.use('/', routes.router);

        app.listen(ConfigProvider.getConfig().server.port, function () {
            console.log(`Server listening on ${ConfigProvider.getConfig().server.port}`);
        });
    }
}