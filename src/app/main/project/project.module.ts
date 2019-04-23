import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { NavigationProjectService } from './services/navigation-project.service';

const routes = [
    {
        path: 'projects/:project_id/dashboards/analytics',
        loadChildren: './dashboards/analytics/analytics.module#AnalyticsDashboardModule'
    },
    {
        path: 'projects/:project_id/dashboards/project',
        loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
    },
    {
        path: 'projects/:project_id/environments',
        loadChildren: './environments/environments.module#EnvironmentsModule',
    },
    {
        path: 'projects/:project_id',
        redirectTo: 'projects/:project_id/dashboards/analytics'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    providers: [
        NavigationProjectService
    ],
    exports: []
})
export class ProjectModule {
}
