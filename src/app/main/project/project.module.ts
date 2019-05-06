import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { NavigationProjectService } from './navigation/navigation-project.service';
import { TodoComponent } from './todo/todo.component';

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
        path: 'projects/:project_id/repositories',
        loadChildren: './repositories/repositories.module#RepositoriesModule',
    },
    {
        path: 'projects/:project_id/workflows',
        loadChildren: './workflows/workflows.module#WorkflowsModule',
    },
    {
        path: 'projects/:project_id/todo',
        component: TodoComponent
    },
    {
        path: 'projects/:project_id/team',
        component: TodoComponent
    },
    {
        path: 'projects/:project_id/servers',
        component: TodoComponent
    },
    {
        path: 'projects/:project_id/all-projects',
        component: TodoComponent
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
    declarations: [
        TodoComponent
    ],
    providers: [
        NavigationProjectService,
        // EnvironmentService
    ],
    exports: []
})
export class ProjectModule {
}
