import {User} from "../entities/User";
import {Course} from "../entities/Course";
import {Project} from "../entities/Project";

export interface CourseRepository {
    createCourse(course: Course): Promise<Course>;
    existsCourse(course: Course): Promise<boolean>;
    getCoursesForUser(user: User): Promise<Course[]>;
    getCourseById(courseId: string): Promise<Course>;
    addProjectToCourse(course: Course, project: Project): Promise<Course>;
    containsCourseProject(course: Course, project: Project): Promise<boolean>;
    removeProjectWithIdFromCourse(course: Course, projectId: string): Promise<Course>;

    addUserToCourseAuthorizees(course: Course, user: User): Promise<Course>;
}