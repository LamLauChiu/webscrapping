import { Routes } from '@angular/router';

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
import { AddTotalUnitComponent } from '../../add-total-unit/add-total-unit.component';

<<<<<<< HEAD
import { ChartsComponent } from '../../charts/charts.component';
=======
import { ChartsDemoComponent } from '../../charts-demo/charts-demo.component';

>>>>>>> 1e7af567b8d24bdb97407de482641279ecb97cfe


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'stockPortfolio',      component: StockPortfolioComponent },
    { path: 'totalUnit',      component: TotalUnitComponent },
<<<<<<< HEAD
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'charts',      component: ChartsComponent },
=======
    { path: 'chartsDemo',      component: ChartsDemoComponent },
    // { path: 'dashboard',      component: DashboardComponent },
>>>>>>> 1e7af567b8d24bdb97407de482641279ecb97cfe
    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];
