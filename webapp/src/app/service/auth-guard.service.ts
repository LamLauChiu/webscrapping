import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    console.log("canActivate");
    if (this.authService.isLoggedIn()) {
      //this.router.navigate(['pages']);
      return true;
    }

    this.router.navigate(["auth"]);
    return false;
  }
}
