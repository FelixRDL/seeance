import {AuthManager, InvalidCredentialsError} from "../../logic/repositories/AuthManager";
import * as request from 'request';
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
            const uri: string = "api.github.com/applications/" + process.env.CLIENT_ID + "/tokens/" + token;
            const authedUri = "https://" + process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET + "@"+ uri;
            const options = {
                uri: authedUri,
                method: 'GET',
                headers: {
                    'User-Agent': 'Client',
                }
            };
            request.get(options, function (error: any, response: any, body: any){
                if(error) {
                    console.log(error);
                } else if(response.statusCode == 200) {
                    resolve(true);
                } else if(response.statusCode == 401) {
                    resolve(false);
                } else {
                    console.log(error);
                    reject(new InternalServerError());
                }
            });
        });
        return promise;
    }
}

export class BadVerificationCodeError extends Error {
    constructor() {
        super();
        this.message = "Bad Verification Code!";
    }
}