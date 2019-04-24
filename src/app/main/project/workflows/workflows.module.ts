import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'list',
        loadChildren: './modules/workflows-list/workflows-list.module#WorkflowsListModule',
        // runGuardsAndResolvers: () => false,
    },
    {
        path        : 'operations',
        loadChildren: './modules/operations/operations.module#OperationsModule',
        // runGuardsAndResolvers: () => false,
    },
    {
        path        : ':workflow_id',
        loadChildren: './modules/workflow-detail/workflow-detail.module#WorkflowDetailModule',
    },
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        // FuseSharedModule
    ],
    providers: [
    ]
})
export class WorkflowsModule
{
}
