import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule, MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule, MatTooltipModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { EnvironemntArchitectureComponent } from './components/environment-architecture/environment-architecture.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { EnvironmentActionsComponent } from './components/environment-actions/environment-actions.component';
import { EnvironmentYmlComponent } from './components/environment-yml/environment-yml.component';

const routes: Routes = [
    {
        path     : '**',
        component: DetailPageComponent
    }
];

@NgModule({
    declarations: [
        EnvironemntArchitectureComponent,
        EnvironmentActionsComponent,
        EnvironmentYmlComponent,
        DetailPageComponent,
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
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatListModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule
    ]
})
export class DetailModule
{
}

