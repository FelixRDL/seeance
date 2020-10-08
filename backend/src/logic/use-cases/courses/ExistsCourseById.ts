import {User} from "../../entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {Course} from "../../entities/Course";
import {CourseRepository} from "../../repositories/CourseRepository";

export async function ExistsCourseById(req: ExistsCourseByIdRequest, repository: CourseRepository): Promise<boolean> {
    return repository.existsCourseById(req.courseId)
}

export interface ExistsCourseByIdRequest {
    courseId: string;
}