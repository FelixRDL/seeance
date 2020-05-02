import {User} from "../entities/User";
import {Course} from "../entities/Course";

export interface CourseRepository {
    createCourse(course: Course): Promise<Course>;
    existsCourse(course: Course): Promise<boolean>;
    getCoursesForUser(user: User): Promise<Course[]>;
}