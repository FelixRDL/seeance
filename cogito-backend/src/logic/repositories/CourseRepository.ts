import {User} from "../entities/User";
import {Course, ProtoCourse} from "../entities/Course";
import {Project} from "../entities/Project";

export interface CourseRepository {
    createCourse(course: Course): Promise<ProtoCourse>;
    existsCourse(course: Course): Promise<boolean>;
    getCoursesForUser(user: User): Promise<ProtoCourse[]>;
    getCourseById(courseId: string): Promise<ProtoCourse>;
    addProjectToCourse(course: Course, project: Project): Promise<ProtoCourse>;
    containsCourseProject(course: Course, project: Project): Promise<boolean>;
    removeProjectWithIdFromCourse(course: Course, projectId: string): Promise<ProtoCourse>;
}