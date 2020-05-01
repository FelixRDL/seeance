import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss']
})
export class LoginRedirectComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.code !== undefined) {
        // TODO: get param "code" and create token from it!
      } else {
        console.error("No code was provided in login redirect, returning to landing page.");
        router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
  }

}
