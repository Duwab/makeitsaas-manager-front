import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RepositoriesListPageComponent } from './pages/list/repositories-list-page.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RepositoriesService } from './services/repositories.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes = [
    {
        path        : 'list',
        component: RepositoriesListPageComponent
    },
    // {
    //     path        : ':environment_id',
    //     loadChildren: './modules/detail/detail.module#DetailModule',
    // }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        // FuseSharedModule
    ],
    declarations: [
        RepositoriesListPageComponent
    ],
    providers: [
        RepositoriesService
    ]
})
export class RepositoriesModule
{
}
