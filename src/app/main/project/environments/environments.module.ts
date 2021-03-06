import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnvironmentService } from './services/environment.service';
import { HttpClientModule } from '@angular/common/http';

// import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'list',
        loadChildren: './modules/list/list.module#ListModule',
        // runGuardsAndResolvers: () => false,
    },
    {
        path        : ':environment_id',
        loadChildren: './modules/detail/detail.module#DetailModule',
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        HttpClientModule,
        // FuseSharedModule
    ],
    providers: [
        EnvironmentService
    ]
})
export class EnvironmentsModule
{
}
