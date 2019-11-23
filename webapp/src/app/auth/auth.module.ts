import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule, routedComponents } from "./auth-routing.module";

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Environment Set up
import { environment } from "../../environments/environment";
import { FormsModule } from '@angular/forms';
//
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../service/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    
    //
    AngularFireModule.initializeApp(environment.firebase), // Main Angular fire module
    AngularFireDatabaseModule, // Firebase database module
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    //
  ],
  //providers: [AuthService, AuthGuard],
  declarations: [...routedComponents]
})
export class AuthModule {}
