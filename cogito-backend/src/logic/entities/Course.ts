import {User} from "./User";
import {Project} from "./Project";

/**
 * The course is an organizational structure representing a software engineering class iteration.
 */
export interface Course {
    _id: string;
    title: string;
    description: string;
    ownerId: string;
    authorizeeIds: string[];
    createdAt: Date;
    updatedAt: Date;
}