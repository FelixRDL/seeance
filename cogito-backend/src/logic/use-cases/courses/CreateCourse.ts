import {User} from "../../entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {Course} from "../../entities/Course";
import {CourseRepository} from "../../repositories/CourseRepository";

export async function CreateCourse(course: Course, repository: CourseRepository): Promise<Course> {
    try {
        const isExisting: boolean = await repository.existsCourse(course);
        if(isExisting) {
            return Promise.reject(new CourseAlreadyExisting());
        } else {
            return repository.createCourse(course);
        }
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

export class CourseAlreadyExisting extends Error {
    constructor() {
        super();
        this.message = "User with id is already existing!";
    }
}