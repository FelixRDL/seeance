import {User} from "../../entities/User";
import {UserRepository} from "../../repositories/UserRepository";

export async function GetUserAutocomplete(req: GetUserAutocompleteRequest, userManager: UserRepository): Promise<User[]> {
    return userManager.getUserAutocomplete(req.q);
}

export interface GetUserAutocompleteRequest {
    q: string
}