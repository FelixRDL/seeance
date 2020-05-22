import {User} from "../../entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {Course} from "../../entities/Course";
import {CourseRepository} from "../../repositories/CourseRepository";
import {CourseNotExistingError} from "./GetCourseById";

export async function DeleteCourseById(req: DeleteCourseByIdRequest, repository: CourseRepository): Promise<void> {
    try {
        if(!await repository.existsCourseById(req.courseId)) {
            return Promise.reject(new CourseNotExistingError());
        } else {
            return repository.removeCourseById(req.courseId);
        }
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

export interface DeleteCourseByIdRequest {
    courseId: string;
}