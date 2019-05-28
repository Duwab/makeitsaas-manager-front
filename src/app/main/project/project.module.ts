import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { NavigationProjectService } from './navigation/navigation-project.service';
import { TodoComponent } from './todo/todo.component';
import { AuthenticatedGuard } from '@core/guards/authenticated.guard';
import { SingleProjectPageComponent } from './pages/single-project/single-project-page.component';

const routes = [
    {
        path: 'projects',
        canActivate: [AuthenticatedGuard],
        loadChildren: './list/projects-list.module#ProjectsListModule'
    },
    {
        path: 'projects/:project_id',
        component: SingleProjectPageComponent,
        canActivate: [AuthenticatedGuard],
        children: [
            {
                path: 'dashboards/analytics',
                loadChildren: './dashboards/analytics/analytics.module#AnalyticsDashboardModule'
            },
            {
                path: 'dashboards/project',
                loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
            },
            {
                path: 'environments',
                loadChildren: './environments/environments.module#EnvironmentsModule',
            },
            {
                path: 'repositories',
                loadChildren: './repositories/repositories.module#RepositoriesModule',
            },
            {
                path: 'workflows',
                loadChildren: './workflows/workflows.module#WorkflowsModule',
            },
            {
                path: 'todo',
                component: TodoComponent
            },
            {
                path: 'team',
                component: TodoComponent
            },
            {
                path: 'servers',
                component: TodoComponent
            },
            {
                path: 'all-projects',
                component: TodoComponent
            },
            {
                path: '**',
                redirectTo: 'dashboards/analytics'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    declarations: [
        SingleProjectPageComponent,
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
