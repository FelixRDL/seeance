import {ConfigProvider} from "./implementation/config/ConfigProvider";
import * as github_keys from "../secret/github_api";
import {Server} from "./driver/webserver/server";
import {StudyProvider} from "./implementation/providers/StudyProvider";
var mongoose = require('mongoose');

process.env.SEEANCE_LOG = ''+ConfigProvider.getConfig().logging

// @ts-ignore
process.env.CLIENT_ID = github_keys.CLIENT_ID;
// @ts-ignore
process.env.CLIENT_SECRET = github_keys.CLIENT_SECRET;

const LOG_DUMP_INTERVAL = 3600;
const studyProvider = new StudyProvider()

setInterval(() => {
    studyProvider.dumpLog()
}, LOG_DUMP_INTERVAL)

// Connect DB (retry code taken from https://github.com/docker/hub-feedback/issues/1255)
function connectWithRetry () {
    mongoose.connect(ConfigProvider.getConfig().database.url, {
        useNewUrlParser: true
    }).then(function() {
        console.log("Connected DB")
    });
}
mongoose.connection.on('error', (err: any) => {
    setTimeout(connectWithRetry, 5000);
});
connectWithRetry();

const server: Server = new Server()
server.init()