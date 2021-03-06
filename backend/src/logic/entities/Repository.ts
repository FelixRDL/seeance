import {User} from "./User";

export interface Repository {
    id: string;
    name: string;
    full_name: string;
    owner: User;
    description: string;
    html_url: string;
    url: string;
}