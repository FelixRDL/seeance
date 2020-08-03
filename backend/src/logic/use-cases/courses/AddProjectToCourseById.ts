import {Project} from "../../entities/Project";
import {CourseRepository} from "../../repositories/CourseRepository";
import {Course} from "../../entities/Course";
import {InternalServerError} from "../../core/errors/InternalServerError";
import {RepoRepository} from "../../repositories/RepoRepository";
import {MethodNotImplementedError} from "../../core/errors/MethodNotImplementedError";
import {ProtoProjectToProjectMapper} from "../../repositories/mappers/ProtoProjectToProjectMapper";
import {ProjectRepository} from "../../repositories/ProjectRepository";

export async function AddProjectToCourseById (
    req: AddProjectToCourseByIdRequest,
    courseRepository: CourseRepository): Promise<Course> {
    return courseRepository.addProjectToCourse(req.courseId, req.project._id)
}

export interface AddProjectToCourseByIdRequest {
    courseId: string,
    project: Project
}