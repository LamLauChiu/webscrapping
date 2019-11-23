import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
//import { StockPortfolioComponent } from "./stock-portfolio/stock-portfolio.component";

import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component" 
const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      // {
      //   path: "**",
      //   component: LoginComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

export const routedComponents = [
  AuthComponent,
  LoginComponent
  //StockPortfolioComponent
];
