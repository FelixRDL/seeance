import * as express from "express";
import {StudyProvider} from "../providers/StudyProvider";
import {createHash} from "crypto"
import {CreateCourse} from "../../logic/use-cases/courses/CreateCourse";
import {InternalCourseRepository} from "../providers/InternalCourseRepository";
import {Project} from "../../logic/entities/Project";
import {CreateProject, CreateProjectRequest} from "../../logic/use-cases/projects/CreateProject";
import {AddProjectToCourseById} from "../../logic/use-cases/courses/AddProjectToCourseById";
import {InternalRepositoryProvider} from "../providers/InternalRepositoryProvider";
import {InternalProjectRepository} from "../providers/InternalProjectRepository";
import {AddPreprocessorToProject} from "../../logic/use-cases/projects/AddPreprocessorToProject";
import {CreatePreprocessor} from "../../logic/use-cases/preprocessors/CreatePreprocessor";
import {PreprocessorTemplateRepository} from "../../logic/repositories/analysis/PreprocessorTemplateRepository";
import {InternalComponentTemplateProviderAccess} from "../providers/InternalComponentTemplateProvider";
import {PreprocessorRepository} from "../../logic/repositories/analysis/PreprocessorRepository";
import {InternalPreprocessorRepository} from "../providers/InternalPreprocessorRepository";
import {CreateAnalysis} from "../../logic/use-cases/analyses/CreateAnalysis";
import {AddAnalysisToProject} from "../../logic/use-cases/projects/AddAnalysisToProject";
import {AnalysisTemplateRepository} from "../../logic/repositories/analysis/AnalysisTemplateRepository";
import {AnalysisRepository} from "../../logic/repositories/analysis/AnalysisRepository";
import {InternalAnalysisProvider} from "../providers/InternalAnalysisProvider";
import {SetPreprocessorConfig} from "../../logic/use-cases/preprocessors/SetPreprocessorConfig";
import {SetAnalysisConfig} from "../../logic/use-cases/analyses/SetAnalysisConfig";

import {MappingsModel} from "../../driver/models/Analysis/MappingsModel";
import {TECHNICAL_TOKEN} from "../../../secret/repo_keys";

export class StudyController {

    private provider: StudyProvider = new StudyProvider();
    static repositoryIds: number[] = [282264565,282462669,282464168,282612137,282612447,282612559,282613443,282620108,282620342,282620687,282620971,282621265,282627029,282627164,282627684,282627780,282630152,282630240]

    constructor() {
    }

    private async storeAnalysisMapping(analysisId: string, analysisName: string) {
        await MappingsModel.create({
            key: analysisId,
            value: analysisName,
            type: 'analysis'
        })
    }

    private static async getAnalysisNameFromId(analysisId: string): Promise<string> {
        const result = await MappingsModel.findOne({
            key: analysisId,
            type: 'analysis'
        })
        return result.value || 'unknown'
    }

    private async storeProjectMapping(projectId: string, projectName: string) {
        console.log({
            key: projectId,
            value: projectName,
            type: 'project'
        })
        await MappingsModel.create({
            key: projectId,
            value: projectName,
            type: 'project'
        })
    }

    private static async getRepoFromProjectId(projectId: string): Promise<string> {
        const result = await MappingsModel.findOne({
            key: projectId,
            type: 'project'
        })
        return result ? result.value : 'unknown'
    }

    private getHashedLoginname(login: string): string {
        return createHash('md5').update(login).digest('hex')
    }

    private async addAnalysis(courseId: string, projectId: string, analysisName: string, config?: any) {
        const analysisTemplateRepository: AnalysisTemplateRepository = InternalComponentTemplateProviderAccess.getInstance();
        const analysisRepository: AnalysisRepository = new InternalAnalysisProvider();
        const analysis = await CreateAnalysis({
                courseId: courseId,
                projectId: projectId,
                name: analysisName,
                template: analysisName
            }, analysisRepository,
            analysisTemplateRepository)
        this.storeAnalysisMapping(analysis._id, analysisName)
        const newAnalyses: string[] = await AddAnalysisToProject({
            analysisId: analysis._id,
            courseId: courseId,
            projectId: projectId
        }, new InternalProjectRepository())
        if(config) {
            await SetAnalysisConfig({
                analysisId: analysis._id,
                config: config
            }, new InternalAnalysisProvider())
        }
    }

    private async addPreprocessor(courseId: string, projectId: string, templateName: string, config?: any) {
        const preprocessorTemplateRepository: PreprocessorTemplateRepository = InternalComponentTemplateProviderAccess.getInstance();
        const preprocessorRepository: PreprocessorRepository = new InternalPreprocessorRepository();
        const preprocessor = await CreatePreprocessor({
                courseId: courseId,
                projectId: projectId,
                name: templateName,
                template: templateName
            }, preprocessorRepository,
            preprocessorTemplateRepository)
        await AddPreprocessorToProject({
            preprocessorId: preprocessor._id,
            courseId: courseId,
            projectId: projectId
        }, new InternalProjectRepository())
        if(config) {
            await SetPreprocessorConfig({
                preprocessorId: preprocessor._id,
                config: config
            }, new InternalPreprocessorRepository())
        }
    }

    async addProject(courseId: string, projectId: number) {
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
        this.storeProjectMapping(project._id, ""+projectId)
        await AddProjectToCourseById({
            courseId: courseId,
            project: project
        }, new InternalCourseRepository());
        await Promise.all([
            this.addPreprocessor(courseId, project._id, 'ignore-files-by-extension', {
                'extensions': ['jpg','png','mp4','svg','ai','wav','mp3', 'gif'],
                'name_contains': ['package-lock', 'DS_Store']
            }),
            this.addPreprocessor(courseId, project._id, 'remove-outliers'),
            this.addAnalysis(courseId, project._id, 'activity-over-time', {
                'end_date': '2020-01-01'
            }),
            this.addAnalysis(courseId, project._id, 'code-evolution', {
                'end_date': '2020-01-01+0000'
            }),
            this.addAnalysis(courseId, project._id, 'estimated-active-time'),
            this.addAnalysis(courseId, project._id, 'file-ownership'),
            this.addAnalysis(courseId, project._id, 'files-by-number-of-coauthors'),
            this.addAnalysis(courseId, project._id, 'files-by-size'),
            this.addAnalysis(courseId, project._id, 'files-per-commit-number'),
            this.addAnalysis(courseId, project._id, 'total-file-ownership'),
            this.addAnalysis(courseId, project._id, 'typical-commit-size')
        ])


        //
        //
        //
    }

    async initializeStudySetup(authenticatedUser: any) {
        const course = await CreateCourse({
            title: 'MME-SS19-Projects',
            description: 'All course project for summer semester 19 course iteration of Multimedia Engineering',
            ownerId: authenticatedUser.githubId,
            authorizeeIds: []
        } as any, authenticatedUser, new InternalCourseRepository());

        const ids = StudyController.repositoryIds
    for(let id of ids) {
            await this.addProject(course._id, id);
        }
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

    async logSystemEvent(req: express.Request, res: express.Response) {
        const user: string = this.getHashedLoginname(res.locals.authenticatedUser.login);
        const evt = req.body
        evt.type = req.params.eventType
        if(evt.type === 'loadAnalysisBegin' || evt.type === 'loadAnalysisComplete') {
            evt.analysis = await StudyController.getAnalysisNameFromId(evt.analysisId)
            evt.project = await StudyController.getRepoFromProjectId(evt.projectId)
        }
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

    static async replaceAccessTokenMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
        if(req.params.id) {
            const repoId: number = +await StudyController.getRepoFromProjectId(req.params.id)
            if (StudyController.repositoryIds.includes(repoId)) {
                req.headers.authorization = TECHNICAL_TOKEN
            }
        }
        next()
    }
}