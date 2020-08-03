import {Course} from "../../entities/Course";
import {User} from "../../entities/User";
import {CourseRepository} from "../../repositories/CourseRepository";

export async function GetCoursesForUser(user: User, repository: CourseRepository): Promise<Course[]> {
    return repository.getAuthorizedCoursesForUser(user);
}