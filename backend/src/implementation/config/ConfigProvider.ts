import * as fs from "fs";

export class ConfigProvider {

    private static config: AppConfig =
        JSON.parse(fs.readFileSync(__dirname + '/../../../conf.json', 'utf-8')) as AppConfig

    public static getConfig(): AppConfig {
        return this.config
    }
}



export interface AppConfig {
    server: {
        port: number
    },
    database: {
        url: string,
        username: string,
        password: string
    },
    study: {
        active: boolean,
        repoIds: number[]
    }
    logging: boolean
}