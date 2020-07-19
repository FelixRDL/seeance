import {CourseRepository} from "../../logic/repositories/CourseRepository";
import {Course} from "../../logic/entities/Course";
import {CourseModel} from "../../driver/models/CourseModel";
import {User} from "../../logic/entities/User";
import {Project} from "../../logic/entities/Project";

export class InternalCourseRepository implements CourseRepository {

    createCourse(newCourse: Course): Promise<Course> {
        const course = new CourseModel({
            title: newCourse.title,
            description: newCourse.description,
            ownerId: newCourse.ownerId,
            authorizeeIds: []
        });
        return <Promise<Course>>course.save();
    }

    existsCourse(course: Course): Promise<boolean> {
        return CourseModel.exists({title: course.title, ownerId: course.ownerId});
    }


    existsCourseById(id: string): Promise<boolean> {
        return CourseModel.exists({_id: id});
    }

    getAuthorizedCoursesForUser(user: User) {
        return CourseModel.find({
            $or: [
                {ownerId: user.id},
                {
                    authorizeeIds: {
                        $in: user.id
                    }
                }
            ]
        });
    }

    getCoursesForUser(user: User): Promise<Course[]> {
        return CourseModel.find(
            {ownerId: user.id},
        );
    }

    getCourseById(courseId: string): Promise<Course> {
        return CourseModel.findById(courseId).populate('owner');
    }

    removeCourseById(courseId: string): Promise<void> {
        return CourseModel.findOne({_id: courseId}).remove().exec();
    }

    removeProjectWithIdFromCourse(course: Course, projectId: string): Promise<Course> {
        return CourseModel.update(
            {_id: course._id},
            {$pull: {projects: projectId}}
        );
    }

    addUserToCourseAuthorizees(course: Course, user: User): Promise<Course> {
        return CourseModel.updateOne(
            {_id: course._id},
            {$push: {'authorizeeIds': user.id}});
    }

    removeUserFromCourseAuthorizees(userId: string, courseId: string): Promise<any> {
        return CourseModel.updateOne(
            {_id: courseId},
            {$pull: {'authorizeeIds': userId}});
    }

    updateCourseById(courseId: string, course: Course): Promise<Course> {
        return CourseModel.update(
            {_id: course._id},
            {
                title: course.title,
                description: course.description
            }
        );
    }

    addProjectToCourse(courseId: string, projectId: string): Promise<Course> {
        return CourseModel.updateOne(
            {_id: courseId},
            {$push: {'projectIds': projectId}});
    }

    removeProjectFromCourse(courseId: string, projectId: string): Promise<Course> {
        return CourseModel.updateOne(
            {_id: courseId},
            {$pull: {'projectIds': projectId}});
    }

    containsCourseProject(course: Course, project: Project): Promise<boolean> {
        return CourseModel.exists({
            $and: [{
                _id: course._id
            }, {
                projects: {
                    "$in": [project._id]
                }
            }
            ]
        });
    }
}