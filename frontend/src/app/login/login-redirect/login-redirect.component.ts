import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss']
})
export class LoginRedirectComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.code !== undefined) {
        this.authService.getTokenFromVerificationCode(params.code).subscribe((isValid: boolean) => {
          console.log("Success:" +isValid);
          router.navigate(['/']);
        }, (err: any) => {
          console.error(err);
          router.navigate(['/']);
        })
      } else {
        console.error("No code was provided in login redirect, returning to landing page.");
        router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
  }

}
