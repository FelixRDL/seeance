import * as express from 'express';
import {ProjectRepository} from "../../logic/repositories/ProjectRepository";
import {InternalProjectRepository} from "../providers/InternalProjectRepository";
import {Project} from "../../logic/entities/Project";
import {RepoRepository} from "../../logic/repositories/RepoRepository";
import {InternalRepositoryProvider} from "../providers/InternalRepositoryProvider";
import {CreateProject, CreateProjectRequest} from "../../logic/use-cases/projects/CreateProject";
import {
    AddProjectToCourseById
} from "../../logic/use-cases/courses/AddProjectToCourseById";
import {CourseNotExistingError} from "../../logic/use-cases/courses/GetCourseById";
import {GetProjectsForCourse, GetProjectsForCourseRequest} from "../../logic/use-cases/projects/GetProjectsForCourse";
import {
    DeleteProjectUseCase,
    DeleteProjectUseCaseRequest
} from "../../logic/use-cases/projects/DeleteProjectUseCase";
import {GetProjectById, GetProjectByIdRequest} from "../../logic/use-cases/projects/GetProjectById";
import {InternalCourseRepository} from "../providers/InternalCourseRepository";
import {RemoveProjectFromCourse} from "../../logic/use-cases/courses/RemoveProjectFromCourse";
import {AnalysisRepository} from "../../logic/repositories/analysis/AnalysisRepository";
import {InternalAnalysisProvider} from "../providers/InternalAnalysisProvider";
import {CreateAnalysis} from "../../logic/use-cases/analyses/CreateAnalysis";
import {AddAnalysisToProject} from "../../logic/use-cases/projects/AddAnalysisToProject";
import {AnalysisTemplateRepository} from "../../logic/repositories/analysis/AnalysisTemplateRepository";
import {InternalComponentTemplateProviderAccess} from "../providers/InternalComponentTemplateProvider";
import {Analysis} from "../../logic/entities/components/Analysis";
import {GetRegisteredAnalysesForProject} from "../../logic/use-cases/projects/GetRegisteredAnalysesForProject";
import {GetAnalysisView} from "../../logic/use-cases/analyses/GetAnalysisView";
import {DatasourceTemplateRepository} from "../../logic/repositories/analysis/DatasourceTemplateRepository";
import {PreprocessorTemplateRepository} from "../../logic/repositories/analysis/PreprocessorTemplateRepository";
import {AnalysisViewGenerator} from "../../logic/repositories/analysis/AnalysisViewGenerator";
import {InternalAnalysisViewGenerator} from "../providers/InternalAnalysisViewGenerator";
import {GetAnalysisById} from "../../logic/use-cases/analyses/GetAnalysisById";
import {SetAnalysisConfig} from "../../logic/use-cases/analyses/SetAnalysisConfig";
import {CreatePreprocessor} from "../../logic/use-cases/preprocessors/CreatePreprocessor";
import {PreprocessorRepository} from "../../logic/repositories/analysis/PreprocessorRepository";
import {InternalPreprocessorRepository} from "../providers/InternalPreprocessorRepository";
import {AddPreprocessorToProject} from "../../logic/use-cases/projects/AddPreprocessorToProject";
import {GetRegisteredPreprocessorsForProject} from "../../logic/use-cases/projects/GetRegisteredPreprocessorsForProject";
import {SetPreprocessorConfig} from "../../logic/use-cases/preprocessors/SetPreprocessorConfig";
import {Preprocessor} from "../../logic/entities/components/Preprocessor";
import {GetPreprocessorById} from "../../logic/use-cases/preprocessors/GetPreprocessorById";
import {DeleteAnalysis} from "../../logic/use-cases/analyses/DeleteAnalysis";
import {RemoveAnalysisFromProject} from "../../logic/use-cases/projects/RemoveAnalysisFromProject";
import {DeletePreprocessor} from "../../logic/use-cases/preprocessors/DeletePreprocessor";
import {RemovePreprocessorFromProject} from "../../logic/use-cases/projects/RemovePreprocessorFromProject";
import {InternalUserRepository} from "../providers/InternalUserRepository";
import {User} from "../../logic/entities/User";
import {RegisterProjectVisit} from "../../logic/use-cases/user/RegisterProjectVisit";
import {GetAnalysisTemplateByName} from "../../logic/use-cases/components/GetAnalysisTemplateByName";
import {AnalysisTemplate} from "../../logic/entities/components/AnalysisTemplate";
import {PreloadProject} from "../../logic/use-cases/projects/PreloadProject";
import {CleanupProject} from "../../logic/use-cases/projects/CleanupProject";
import {IsRepositoryReferencedInOtherProject} from "../../logic/use-cases/projects/IsRepositoryReferencedInOtherProject";

export class ProjectsController {
    private repository: ProjectRepository = new InternalProjectRepository();
    private analysisRepository: AnalysisRepository = new InternalAnalysisProvider();
    private analysisTemplateRepository: AnalysisTemplateRepository = InternalComponentTemplateProviderAccess.getInstance();
    private datasourceTemplateRepository: DatasourceTemplateRepository = InternalComponentTemplateProviderAccess.getInstance();
    private preprocessorTemplateRepository: PreprocessorTemplateRepository = InternalComponentTemplateProviderAccess.getInstance();
    private preprocessorRepository: PreprocessorRepository = new InternalPreprocessorRepository();
    private analysisViewGenerator: AnalysisViewGenerator = new InternalAnalysisViewGenerator();

    async createProject(req: express.Request, res: express.Response) {
        try {
            console.log(req.body)
            const token: string = <string>req.headers.authorization;
            const repoProvider: RepoRepository = new InternalRepositoryProvider(token);
            const project: Project = await CreateProject(
                this.repository,
                repoProvider, <CreateProjectRequest>{
                    project: req.body,
                    courseId: res.locals.courseId
                });
            await AddProjectToCourseById({
                courseId: res.locals.courseId,
                project: project
            }, new InternalCourseRepository());
            PreloadProject({
                token: token,
                repositoryName: req.body.repository.name,
                ownerName: req.body.repository.owner.login
            }, new InternalAnalysisViewGenerator())
            res.json(project);
        } catch (e) {
            if (e instanceof CourseNotExistingError) {
                res.status(404).send("The course you are trying to access does not exist right now");
            } else {
                console.error(e);
                res.status(500).send("Internal Server Error");
            }
        }
    }

    async getProjectsForCourse(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const repoProvider: RepoRepository = new InternalRepositoryProvider(token);
            const projects: Project[] = await GetProjectsForCourse(this.repository, repoProvider, <GetProjectsForCourseRequest>{
                courseId: res.locals.courseId
            });
            res.json(projects);
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async getProjectById(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const repoProvider: RepoRepository = new InternalRepositoryProvider(token);
            const project: Project = await GetProjectById(<GetProjectByIdRequest>{
                id: req.params.id
            }, this.repository, repoProvider);
            res.set('Cache-Control', 'public, max-age=72020').json(project);
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async removeProjectFromCourse(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const project = await GetProjectById(
                {
                    id: req.params.id
                }, this.repository,
                new InternalRepositoryProvider(token)
            )
            const success: boolean = await DeleteProjectUseCase(
                this.repository,
                {
                    projectId: req.params.id,
                    courseId: res.locals.courseId
                } as DeleteProjectUseCaseRequest
            );
            if (!success) {
                res.status(404).send("The project to be deleted does not exist");
            } else {
                await RemoveProjectFromCourse({
                    projectId: req.params.id,
                    courseId: res.locals.courseId
                }, new InternalCourseRepository())
                if(!await IsRepositoryReferencedInOtherProject({repoId: project.repositoryId}, this.repository)) {
                    await CleanupProject({
                        repoName: project.repository.name,
                        repoOwner: project.repository.owner.login
                    }, new InternalAnalysisViewGenerator())
                }
                res.status(200).json({
                    id: req.params.id
                });
            }
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal server error");
        }
    }

    //
    // PREPROCESSORS
    //

    async addPreprocessorToCourse(req: express.Request, res: express.Response) {
        try {
            const preprocessor = await CreatePreprocessor({
                    courseId: res.locals.courseId,
                    projectId: req.params.id,
                    name: req.body.template,
                    template: req.body.template
                }, this.preprocessorRepository,
                this.preprocessorTemplateRepository)
            const newPreprocessors: string[] = await AddPreprocessorToProject({
                preprocessorId: preprocessor._id,
                courseId: res.locals.courseId,
                projectId: req.params.id
            }, this.repository)
            res.json(newPreprocessors)
        } catch (e) {
            console.error(e)
            res.status(500).send("Internal Server Error")
        }
    }

    async getPreprocessorsForCourse(req: express.Request, res: express.Response) {
        try {
            const preprocessors = await GetRegisteredPreprocessorsForProject({
                courseId: res.locals.courseId,
                projectId: req.params.id
            }, this.preprocessorRepository)
            res.json(preprocessors)
        } catch (e) {
            console.error(e)
            res.status(500).send("Internal Server Error")
        }
    }

    async getPreprocessorById(req: express.Request, res: express.Response) {
        try {
            const preprocessors = await GetPreprocessorById(req.params.preprocessorId, this.preprocessorRepository)
            res.json(preprocessors)
        } catch (e) {
            console.error(e)
            res.status(500).send("Internal Server Error")
        }
    }

    //
    // ANALYSES
    //

    async addAnalysisToCourse(req: express.Request, res: express.Response) {
        try {
            // TODO: check, whether analysis exists by name
            const analysis = await CreateAnalysis({
                    courseId: res.locals.courseId,
                    projectId: req.params.id,
                    name: req.body.template,
                    template: req.body.template
                }, this.analysisRepository,
                this.analysisTemplateRepository)
            const newAnalyses: string[] = await AddAnalysisToProject({
                analysisId: analysis._id,
                courseId: res.locals.courseId,
                projectId: req.params.id
            }, this.repository)
            res.json(newAnalyses)
        } catch (e) {
            console.error(e)
            res.status(500).send("Internal Server Error")
        }
    }

    async getAnalysesForCourse(req: express.Request, res: express.Response) {
        try {
            let analysesForCourse: ExtendedAnalysis[] = await GetRegisteredAnalysesForProject({
                courseId: res.locals.courseId,
                projectId: req.params.id
            }, this.analysisRepository) as ExtendedAnalysis[]
            const templates: AnalysisTemplate[] = await Promise.all(analysesForCourse.map((a: Analysis) => GetAnalysisTemplateByName(a.analysis, this.analysisTemplateRepository))            )
            analysesForCourse = templates.map((t,i) => {
                delete t["module"]
                // this is necessary, since the object seemingly is a mongoose document
                var val: ExtendedAnalysis = (<any>Object.assign({}, analysesForCourse[i]))['_doc']
                val.template = t
                return val
            })
            console.log(JSON.stringify(analysesForCourse))
            res.json(analysesForCourse)
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error")
        }
    }

    async getAnalysisById(req: express.Request, res: express.Response) {
        try {
            let analysis: ExtendedAnalysis = await GetAnalysisById(
                req.params.analysisId, this.analysisRepository) as ExtendedAnalysis
            analysis = (<any>Object.assign({}, analysis))['_doc']
            analysis.template = (await GetAnalysisTemplateByName(analysis.analysis, this.analysisTemplateRepository))
            res.json(analysis)
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error")
        }
    }

    async getAnalysisViewForCourse(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const project = await GetProjectById({
                id: req.params.id
            }, this.repository, new InternalRepositoryProvider(token));
            const analysis = await GetAnalysisById(
                req.params.analysisId,
                this.analysisRepository
            )
            const preprocessors = await GetRegisteredPreprocessorsForProject({
                    projectId: req.params.id,
                    courseId: res.locals.courseId
                },
                this.preprocessorRepository
            )
            let result = await GetAnalysisView({
                    repoOwner: project.repository.owner.login,
                    repoName: project.repository.name,
                    preprocessors: preprocessors,
                    analysis: analysis,
                    token: token
                },
                this.analysisViewGenerator,
                this.datasourceTemplateRepository,
                this.preprocessorTemplateRepository,
                this.analysisTemplateRepository
            )
            res.set('Content-Type', 'text/html')
            res.send(result)
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error")
        }
    }

    async setConfigurationForAnalysis(req: express.Request, res: express.Response) {
        try {
            // TODO: check, whether config fits schema?
            let result = await SetAnalysisConfig({
                config: req.body,
                analysisId: req.params.analysisId
            }, this.analysisRepository)
            let newAnalysis: Analysis = await GetAnalysisById(req.params.analysisId, this.analysisRepository)
            res.json(newAnalysis.config)
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error")
        }
    }

    async setConfigurationForPreprocessor(req: express.Request, res: express.Response) {
        try {
            // TODO: check, whether config fits schema?
            let result = await SetPreprocessorConfig({
                config: req.body,
                preprocessorId: req.params.preprocessorId
            }, this.preprocessorRepository)
            let newPreprocessor: Preprocessor = await GetPreprocessorById(req.params.preprocessorId, this.preprocessorRepository)
            res.json(newPreprocessor.config)
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error")
        }
    }

    async removeAnalysis(req: express.Request, res: express.Response) {
        try {
            await DeleteAnalysis(req.params.analysisId, this.analysisRepository)
            await RemoveAnalysisFromProject({
                analysisId: req.params.analysisId,
                courseId: res.locals.courseId,
                projectId: req.params.id
            }, this.repository)
            res.json({})
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error")
        }
    }

    async removePreprocessor(req: express.Request, res: express.Response) {
        try {
            await DeletePreprocessor(req.params.preprocessorId, this.preprocessorRepository)
            await RemovePreprocessorFromProject({
                preprocessorId: req.params.preprocessorId,
                courseId: res.locals.courseId,
                projectId: req.params.id
            }, this.repository)
            res.json({})
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error")
        }
    }

    async registerProjectVisit(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const uProvider: InternalUserRepository = new InternalUserRepository(token);
            await RegisterProjectVisit({
                    projectName: req.body.projectName,
                    courseName: req.body.courseName,
                    userId: res.locals.authenticatedUser.id,
                    url: req.body.url
                }
                , uProvider);
            res.send()
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }
}

interface ExtendedAnalysis extends Analysis {
    template?: AnalysisTemplate
}