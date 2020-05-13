import {User} from "./User";
import {Project} from "./Project";

/**
 * The course is an organizational structure representing a software engineering class iteration.
 */
export interface Course extends ProtoCourse {
    projects: Project[];
}


/**
 * The ProtoCourse is an unjoined version of the course object.
 */
export interface ProtoCourse {
    _id: string;
    title: string;
    description: string;
    owner: User;
    projectIds: string[];
    createdAt: Date;
    updatedAt: Date;
}