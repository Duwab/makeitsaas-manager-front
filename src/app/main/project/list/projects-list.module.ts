import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule, MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule
} from '@angular/material';
import { CardsListPageComponent } from './pages/cards-list/cards-list-page.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { ModalProjectCreateComponent } from './components/modal-project-create/modal-project-create.component';

const routes = [
    {
        path: '',
        component: CardsListPageComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatListModule,
        MatInputModule,
        MatSnackBarModule,
    ],
    declarations: [
        CardsListPageComponent,
        ModalProjectCreateComponent
    ],
    entryComponents: [
        ModalProjectCreateComponent
    ]
})
export class ProjectsListModule {}