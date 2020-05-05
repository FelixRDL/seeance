import {CourseRepository} from "../../logic/repositories/CourseRepository";
import {Course} from "../../logic/entities/Course";
import {CourseModel} from "../../driver/models/CourseModel";
import {User} from "../../logic/entities/User";

export class InternalCourseRepository implements CourseRepository {

    createCourse(newCourse: Course): Promise<Course> {
        const course = new CourseModel(newCourse);
        return <Promise<Course>>course.save();
    }

    existsCourse(course: Course): Promise<boolean> {
        return CourseModel.exists({title: course.title, owner: course.owner});
    }

    getCoursesForUser(user: User): Promise<Course[]> {
        return CourseModel.find({owner: user});
    }

}