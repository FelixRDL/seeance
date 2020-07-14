/**
 * Represents a registered user of the application.
 */
export interface User {
    _id: string;
    id: string;
    login: string;
    description: string;
    profileLink: string;
    avatarImageUrl: string;
    registeredSince: Date;
    visits: ProjectVisit[];
}

interface ProjectVisit {
    url: string,
    courseName: string,
    projectName: string
}