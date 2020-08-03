import {User} from "../entities/User";
import {Course} from "../entities/Course";
import {Project} from "../entities/Project";

export interface CourseRepository {
    createCourse(course: Course): Promise<Course>;

    existsCourse(course: Course): Promise<boolean>;

    existsCourseById(id: string): Promise<boolean>;

    getCoursesForUser(user: User): Promise<Course[]>;

    getAuthorizedCoursesForUser(user: User): Promise<Course[]>;

    getCourseById(courseId: string): Promise<Course>;
  
    updateCourseById(courseId: string, course: Course): Promise<Course>;
  
    removeCourseById(courseId: string): Promise<void>;

    removeProjectWithIdFromCourse(course: Course, projectId: string): Promise<Course>;

    addUserToCourseAuthorizees(course: Course, user: User): Promise<Course>;

    removeUserFromCourseAuthorizees(userId: string, courseId: string): Promise<any>;

    addProjectToCourse(courseId: string, projectId: string): Promise<Course>;

    removeProjectFromCourse(courseId: string, projectId: string): Promise<Course>;

    containsCourseProject(course: Course, project: Project): Promise<boolean>;
}