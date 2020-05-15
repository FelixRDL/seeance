import {Project} from "../../entities/Project";
import {CourseRepository} from "../../repositories/CourseRepository";
import {Course, ProtoCourse} from "../../entities/Course";
import {InternalServerError} from "../../core/errors/InternalServerError";
import {RepoRepository} from "../../repositories/RepoRepository";
import {MethodNotImplementedError} from "../../core/errors/MethodNotImplementedError";
import {ProtoCourseToCourseMapper} from "../../repositories/mappers/ProtoCourseToCourseMapper";
import {ProtoProjectToProjectMapper} from "../../repositories/mappers/ProtoProjectToProjectMapper";
import {ProjectRepository} from "../../repositories/ProjectRepository";

export async function AddProjectToCourseById(
    courseId: string,
    project: Project,
    courseRepository: CourseRepository,
    projectRepository: ProjectRepository,
    repositoryProvider: RepoRepository): Promise<Course> {
    try {
        const proto: ProtoCourse = await courseRepository.getCourseById(courseId);
        const mapper: ProtoCourseToCourseMapper = new ProtoCourseToCourseMapper(
            courseRepository,
            projectRepository,
            new ProtoProjectToProjectMapper(repositoryProvider)
        );
        const course: Course = await mapper.map(proto);
        console.log(course);
        return Promise.resolve(course);
        /*const course: Course = await courseRepository.getCourseById(courseId);*/
        /*if(!course) {
            return Promise.reject(new CourseNotExistingError());
        } else {
            const isProjectAlreadyAdded = await courseRepository.containsCourseProject(course, project);
            if(isProjectAlreadyAdded) {
                return Promise.reject(new ProjectAlreadyExistingInCourseError());
            } else {
                await courseRepository.addProjectToCourse(course, project);
                return courseRepository.getCourseById(courseId);
            }
        }*/
    } catch(e) {
        console.error(e);
        return Promise.reject(new InternalServerError());
    }
}

export class ProjectAlreadyExistingInCourseError extends Error {
    constructor() {
        super();
        this.message = "This project is already added to the course!";
    }
}