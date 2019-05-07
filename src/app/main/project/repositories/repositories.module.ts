import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RepositoriesListPageComponent } from './pages/list/repositories-list-page.component';
import {
    MatButtonModule,
    MatDialogModule, MatFormFieldModule, MatGridListModule,
    MatIconModule, MatInputModule, MatRadioModule,
    MatSnackBarModule, MatStepperModule,
    MatTooltipModule
} from '@angular/material';
import { RepositoriesService } from './services/repositories.service';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalNewRepositoryComponent } from './components/modal-new-repository/modal-new-repository.component';
import { RepositoryEditorService } from './services/repository-editor.service';
import { ReactiveFormsModule } from '@angular/forms';

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
        MatTooltipModule,
        MatGridListModule,
        MatDialogModule,
        MatSnackBarModule,
        MatStepperModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        // FuseSharedModule
    ],
    declarations: [
        RepositoriesListPageComponent,
        ModalNewRepositoryComponent
    ],
    providers: [
        RepositoriesService,
        RepositoryEditorService
    ],
    entryComponents: [
        ModalNewRepositoryComponent
    ]
})
export class RepositoriesModule
{
}
