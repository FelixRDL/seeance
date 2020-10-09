import {AuthManager, InvalidCredentialsError} from "../../logic/repositories/AuthManager";
const request = require('request')
import {InternalServerError} from "../../logic/core/errors/InternalServerError";

export class GithubAuthManager implements AuthManager {
    private githubPath: string = "https://github.com/";
    private githubApiPath: string = "https://api.github.com/";

    getTokenFromCode(code: string): Promise<string> {
        const promise: Promise<string> = new Promise<string>((resolve, reject) => {
            const uri:string = this.githubPath + 'login/oauth/access_token?client_id='+ process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + code;
            request.get(uri, function(error: any, response: any, body: any) {
                if(error) {
                    reject(error);
                } else {
                    const token = body.split("&")[0].split("=")[1];
                    if(token == "bad_verification_code") {
                        reject(new BadVerificationCodeError());
                    } else {
                        resolve(token);
                    }
                }
            });
        });
        return promise;
    }

    verifyToken(token: string): Promise<boolean> {

        const promise: Promise<boolean> = new Promise<boolean>((resolve, reject) => {
            // const uri: string = "https://api.github.com/applications/" + process.env.CLIENT_ID + "/tokens/" + token;
            const verifyUri: string = "https://api.github.com/applications/" + process.env.CLIENT_ID + "/token";
            // const authedUri = "https://" + process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET + "@"+ uri;
            const req = {
                uri: verifyUri,
                method: 'POST',
                headers: {
                    'User-Agent': 'Client',
                    'Authorization': 'Basic ' +Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')
                }
            };
            request(req, function (error: any, response: any, body: any){
                if(error) {
                    console.log(error);
                } else if(response.statusCode == 200) {
                    resolve(true);
                } else if(response.statusCode == 401) {
                    resolve(false);
                } else  {
                    console.log(error);
                    reject(new InternalServerError());
                }
            });
        });
        return promise;
    }

    revokeToken(token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            //const uri: string = "api.github.com/applications/" + process.env.CLIENT_ID + "/tokens/" + token;
            //const authedUri = "https://" + process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET + "@"+ uri;
            const uri: string = "https://api.github.com/applications/" + process.env.CLIENT_ID + "/token"
            const req = {
                uri: uri,
                method: 'DELETE',
                headers: {
                    'User-Agent': 'Client',
                    'Authorization': 'Basic ' +Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')
                },
                access_token: token
            };
            request(req, function (error: any, response: any, body: any){
                console.log(response)
                if(error) {
                    reject(error)
                } else if(response.statusCode == 204) {
                    resolve();
                } else if(response.statusCode == 401) {
                    reject();
                } else {
                    console.log(error);
                    reject(new InternalServerError());
                }
            });
        })
    }
}

export class BadVerificationCodeError extends Error {
    constructor() {
        super();
        this.message = "Bad Verification Code!";
    }
}