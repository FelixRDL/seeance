import {Course} from "../../entities/Course";
import {CourseRepository} from "../../repositories/CourseRepository";

export function RemoveProjectFromCourse(req: RemoveProjectFromCourseRequest, courseRepository: CourseRepository): Promise<Course> {
    return courseRepository.removeProjectFromCourse(req.courseId, req.projectId);
}

export interface RemoveProjectFromCourseRequest {
    projectId: string,
    courseId: string
}