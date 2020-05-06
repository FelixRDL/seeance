import {User} from "../../entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {Course} from "../../entities/Course";
import {CourseRepository} from "../../repositories/CourseRepository";

export async function CreateCourse(course: Course, user: User, repository: CourseRepository): Promise<Course> {
    try {
        course.owner = user;
        // TODO: this may be related to a bug in mongoose, since it always adds an array initialized with [""]
        course.projects = [];
        const isExisting: boolean = await repository.existsCourse(course);
        if(isExisting) {
            return Promise.reject(new CourseAlreadyExistingError());
        } else {
            return repository.createCourse(course);
        }
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

export class CourseAlreadyExistingError extends Error {
    constructor() {
        super();
        this.message = "Course with user and title already existing!";
    }
}