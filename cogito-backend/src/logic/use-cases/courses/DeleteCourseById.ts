import {User} from "../../entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {Course} from "../../entities/Course";
import {CourseRepository} from "../../repositories/CourseRepository";
import {CourseNotExistingError} from "./GetCourseById";
import {ProjectRepository} from "../../repositories/ProjectRepository";

export async function DeleteCourseById(
    req: DeleteCourseByIdRequest,
    repository: CourseRepository,
    pRepo: ProjectRepository): Promise<void> {
    try {
        if(!await repository.existsCourseById(req.courseId)) {
            return Promise.reject(new CourseNotExistingError());
        } else {
            await repository.removeCourseById(req.courseId);
            await pRepo.removeAllProjectsForCourse(req.courseId);
            return Promise.resolve();
        }
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

export interface DeleteCourseByIdRequest {
    courseId: string;
}