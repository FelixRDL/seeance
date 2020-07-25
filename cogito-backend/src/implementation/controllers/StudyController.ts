import * as express from "express";
import {StudyProvider} from "../providers/StudyProvider";
import {createHash} from "crypto"


export class StudyController {

    private provider: StudyProvider = new StudyProvider();

    private getHashedLoginname(login: string): string {
        return createHash('md5').update(login).digest('hex')
    }

    logRegistration(req: express.Request, res: express.Response) {
        const user: string = this.getHashedLoginname(res.locals.authenticatedUser.login);
        this.provider.storeEvent(user, 'registration', '')
        res.send()
    }

    logDemography(req: express.Request, res: express.Response) {
        const user: string = this.getHashedLoginname(res.locals.authenticatedUser.login);
        this.provider.storeEvent(user, 'demography', req.body)
        res.send()
    }

    logUiEvent(req: express.Request, res: express.Response) {
        const user: string = this.getHashedLoginname(res.locals.authenticatedUser.login);
        this.provider.storeEvent(user, 'uiEvent', req.body)
        res.send()
    }

    logUeq(req: express.Request, res: express.Response) {
        const user: string = this.getHashedLoginname(res.locals.authenticatedUser.login);
        this.provider.storeEvent(user, 'ueq', req.body)
        res.send()
    }

    logNotes(req: express.Request, res: express.Response) {
        const user: string = this.getHashedLoginname(res.locals.authenticatedUser.login);
        this.provider.storeEvent(user, 'notes', req.body)
        res.send()
    }

    logTaskStart(req: express.Request, res: express.Response) {
        const user: string = this.getHashedLoginname(res.locals.authenticatedUser.login);
        this.provider.storeEvent(user, `taskstart`, req.params.taskId)
        res.send()
    }

    logTaskStop(req: express.Request, res: express.Response) {
        const user: string = this.getHashedLoginname(res.locals.authenticatedUser.login);
        this.provider.storeEvent(user, `taskstop`, req.params.taskId)
        res.send()
    }
}