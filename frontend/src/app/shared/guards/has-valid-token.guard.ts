import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {AuthService} from "../auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class HasValidTokenGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const subj: Subject<boolean> = new Subject<boolean>();
    this.authService.isTokenValid().subscribe((isValid) => {
      if(!isValid) {
        this.router.navigate(['start']);
      } else {
        subj.next(true);
        subj.complete();
      }
    }, (e) => {
      this.router.navigate(['start']);
    });
    return subj;
  }
}
