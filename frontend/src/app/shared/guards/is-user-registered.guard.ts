import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {AuthService} from "../auth.service";
import {Injectable} from "@angular/core";
import {UserService} from "../user.service";
import {User} from "../core/User";

@Injectable()
export class IsUserRegisteredGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const subj: Subject<boolean> = new Subject<boolean>();
    this.userService.getAuthenticatedUser().subscribe((data: User) => {
      if(!data) {
        this.router.navigate(['register']);
      } else {
        this.userService.setAuthenticatedUser(data);
          subj.next(true);
      }
      subj.complete();
    });
    return subj;
  }
}
