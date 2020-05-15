import {CourseRepository} from "../../logic/repositories/CourseRepository";
import {Course} from "../../logic/entities/Course";
import {CourseModel} from "../../driver/models/CourseModel";
import {User} from "../../logic/entities/User";
import {Project} from "../../logic/entities/Project";
import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";

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

    getCourseById(courseId: string): Promise<Course> {
        return CourseModel.findById(courseId).populate('owner');
    }

    addProjectToCourse(course: Course, project: Project): Promise<Course> {
        return CourseModel.updateOne(
            {_id: course._id},
            {$push: {'projects': project._id}});
    }

    containsCourseProject(course: Course, project: Project): Promise<boolean> {
        return CourseModel.exists({
            $and: [{
                _id: course._id
            }, {
                projects: {
                    "$in" : [project._id]
                }
            }
            ]
        });
    }

    removeProjectWithIdFromCourse(course: Course, projectId: string): Promise<Course> {
        return CourseModel.update(
            { _id: course._id},
            { $pull: { projects: projectId } }
        )
        return Promise.reject(new MethodNotImplementedError());
    }

    constructor() {
    }

}