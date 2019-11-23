import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-auth-component",
  //template: "<ngx-sample-layout><router-outlet></router-outlet></ngx-sample-layout>"
  // template: "\n    <nb-layout>\n      <nb-layout-column>\n        <nb-card>\n          <nb-card-header>\n            <nav class=\"navigation\">\n              <a href=\"#\" (click)=\"back()\" class=\"link\" aria-label=\"Back\"><i class=\"icon nb-arrow-thin-left\"></i></a>\n            </nav>\n          </nb-card-header>\n          <nb-card-body>\n                       <router-outlet></router-outlet>\n                    </nb-card-body>\n        </nb-card>\n      </nb-layout-column>\n    </nb-layout>\n  ",
  templateUrl: "./auth.component.html"
  //styleUrls: ['./main-portfolio.component.scss']
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
