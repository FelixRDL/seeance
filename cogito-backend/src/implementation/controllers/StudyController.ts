import * as express from "express";
import {StudyProvider} from "../providers/StudyProvider";
import {createHash} from "crypto"
import {Course} from "../../logic/entities/Course";
import {CreateCourse} from "../../logic/use-cases/courses/CreateCourse";
import {InternalCourseRepository} from "../providers/InternalCourseRepository";
import {Project} from "../../logic/entities/Project";
import {CreateProject, CreateProjectRequest} from "../../logic/use-cases/projects/CreateProject";
import {AddProjectToCourseById} from "../../logic/use-cases/courses/AddProjectToCourseById";
import {InternalRepositoryProvider} from "../providers/InternalRepositoryProvider";
import {InternalProjectRepository} from "../providers/InternalProjectRepository";


export class StudyController {

    private provider: StudyProvider = new StudyProvider();

    private getHashedLoginname(login: string): string {
        return createHash('md5').update(login).digest('hex')
    }

    async addProject(courseId: string, projectId: string) {
        const repoProvider = new InternalRepositoryProvider()
        const projectProvider = new InternalProjectRepository()
        const project: Project = await CreateProject(
            projectProvider,
            repoProvider, <CreateProjectRequest>{
                project: {
                    repository: {
                        id: projectId
                    }
                } as any,
                courseId: courseId
            }, );
        await AddProjectToCourseById({
            courseId: courseId,
            project: project
        }, new InternalCourseRepository());
    }

    async initializeStudySetup(authenticatedUser: any) {
        const course = await CreateCourse({
            title: 'MME-SS19-Projects',
            description: 'All course project for summer semester 19 course iteration of Multimedia Engineering',
            ownerId: authenticatedUser.githubId,
            authorizeeIds: []
        } as any, authenticatedUser, new InternalCourseRepository());
        await this.addProject(course._id, '282462669');
        await this.addProject(course._id, '282264565');
        await this.addProject(course._id, '282464168');


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

    logSystemEvent(req: express.Request, res: express.Response) {
        const user: string = this.getHashedLoginname(res.locals.authenticatedUser.login);
        const evt = req.body
        evt.type = req.params.eventType
        this.provider.storeEvent(user, 'systemEvent', evt)
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