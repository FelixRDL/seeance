import {User} from "./User";
import {Repository} from "./Repository";

export interface Project {
  _id: string;
  repository: Repository;
}
