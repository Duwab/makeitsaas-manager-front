import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
        //runGuardsAndResolvers: () => false,
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        // FuseSharedModule
    ]
})
export class EnvironmentsModule
{
}
