import { NgModule } from '@angular/core';
import { PageCenteredComponent } from './page-centered.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
    imports: [
        RouterModule,
        MatIconModule,
        FuseSharedModule
    ],
    declarations: [
        PageCenteredComponent
    ]
})
export class PageCenteredModule
{
}
