import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalNewRepositoryComponent } from '../components/modal-new-repository/modal-new-repository.component';

@Injectable()
export class RepositoryEditorService {

    constructor(
        private dialog: MatDialog
    ) {}

    createModal() {
        this.dialog.open(ModalNewRepositoryComponent, {
            width: '700px',
            data: {}
        });
    }
}