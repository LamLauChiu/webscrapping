import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// Firebase 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// Environment Set up
import { environment } from '../environments/environment';

// For ng-zorro
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';

import en from '@angular/common/locales/en';

import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./service/auth.service";
import { AuthGuard } from "./service/auth-guard.service";

import { NgxEchartsModule } from 'ngx-echarts';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule, 
    HttpClientModule, 
    HttpClientJsonpModule, 
    NgZorroAntdModule,
    ScrollingModule,
    DragDropModule,
    NzLayoutModule,

    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
        //
        AngularFireModule.initializeApp(environment.firebase), // Main Angular fire module 
        AngularFireDatabaseModule,  // Firebase database module 
        //

      AuthModule,
      NgxEchartsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [ { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }, AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
