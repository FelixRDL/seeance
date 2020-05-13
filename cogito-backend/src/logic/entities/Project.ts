import {User} from "./User";
import {Repository} from "./Repository";

/**
 * A Project is an internal presentation of a github repository, enriched by internal information, such as processing
 * units and authorization.
 */
export interface Project extends ProtoProject {
    repository: Repository;
}

/**
 * An unpopulated version of the project
 */
export interface ProtoProject {
    _id: string;
    courseId: string;
    repositoryId: string;
}