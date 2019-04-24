import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { WorkflowsListComponent } from './workflows-list.component';
import { WorkflowsListService } from './workflows-list.service';

const routes: Routes = [
    {
        path     : '**',
        component: WorkflowsListComponent,
        resolve  : {
            data: WorkflowsListService
        }
    }
];

@NgModule({
    declarations: [
        WorkflowsListComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MatListModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule
    ],
    providers   : [
        WorkflowsListService
    ]
})
export class WorkflowsListModule
{
}

