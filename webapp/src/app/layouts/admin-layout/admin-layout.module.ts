import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';


//
import { StockPortfolioComponent } from '../../stock-portfolio/stock-portfolio.component';
import { TotalUnitComponent } from '../../total-unit/total-unit.component';

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
import en from '@angular/common/locales/en';

import { AddStockPortfolioComponent } from '../../add-stock-portfolio/add-stock-portfolio.component';
import { AddTotalUnitComponent } from '../../add-total-unit/add-total-unit.component';

// Auth
import { AuthModule } from "../../auth/auth.module";
import { AuthService } from "../../service/auth.service";
import { AuthGuard } from "../../service/auth-guard.service";

// For charts
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsDemoComponent } from '../../charts-demo/charts-demo.component';
import { ChartModule, StockChartAllModule, ChartAllModule, RangeNavigatorModule } from '@syncfusion/ej2-angular-charts';
import { LineSeriesService, SplineSeriesService, RangeTooltipService, StepLineSeriesService, CategoryService, ParetoSeriesService, ColumnSeriesService,
       SplineAreaSeriesService, MultiColoredLineSeriesService, TooltipService} from '@syncfusion/ej2-angular-charts';
import {  AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';

import { PortfolioUnitDiaryComponent } from '../../portfolio-unit-diary/portfolio-unit-diary.component';


registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])





import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,

    //BrowserModule, 
    //HttpClientModule, 
    //HttpClientJsonpModule, 
    NgZorroAntdModule,
    ScrollingModule,
    DragDropModule,

    AuthModule,
    NgxChartsModule,
    
    ChartAllModule, StockChartAllModule,
    ChartModule, StockChartAllModule, ChartAllModule, RangeNavigatorModule,
    AccumulationChartAllModule, RangeNavigatorAllModule
 

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    //
    StockPortfolioComponent,
    TotalUnitComponent,
    AddStockPortfolioComponent,
    AddTotalUnitComponent,
    ChartsDemoComponent,
    //
    PortfolioUnitDiaryComponent,

  ],
  entryComponents: [
    AddStockPortfolioComponent,
    AddTotalUnitComponent
  ],
  providers: [ 
    { provide: NZ_I18N, useValue: en_US }, 
    { provide: NZ_ICONS, useValue: icons }, 
    AuthService, 
    AuthGuard,
    LineSeriesService, SplineSeriesService, RangeTooltipService, StepLineSeriesService, CategoryService, SplineAreaSeriesService, ParetoSeriesService, ColumnSeriesService,
    MultiColoredLineSeriesService, TooltipService
   ],
})

export class AdminLayoutModule {}
