import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalNewRepositoryComponent } from '../components/modal-new-repository/modal-new-repository.component';
import { NavigationProjectService } from '../../navigation/navigation-project.service';

@Injectable({
    providedIn: 'root'
})
export class RepositoryEditorService {

    constructor(
        private dialog: MatDialog,
        private navigationProjectService: NavigationProjectService,
    ) {}

    launchCreateFormDialog() {
        this.dialog.open(ModalNewRepositoryComponent, {
            width: '700px',
            data: {
                project_id: this.navigationProjectService.getCurrentProjectId()
            }
        });
    }
}