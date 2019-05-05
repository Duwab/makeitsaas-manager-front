import { Component, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EnvironmentService } from '../../../../services/environment.service';
import { ModalSubdomainEditorComponent } from '../modal-subdomain-editor/modal-subdomain-editor.component';

@Component({
    selector: 'environment-actions',
    templateUrl: './environment-actions.component.html'
})
export class EnvironmentActionsComponent {
    @Input() environmentId: string;

    constructor(
        private environmentService: EnvironmentService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ){}

    deploy() {
        alert('create deploy order');
    }

    save() {
        alert('save configuration');
    }

    addDomain() {
        this.dialog.open(ModalSubdomainEditorComponent, {
            width: '250px',
            data: {
                environmentId: this.environmentId
            }
        });
    }

    addService() {
        this.environmentService.addService(this.environmentId);
        /*
            new service modal stepper :
            - blank service Vs distribution service
            - customize service config
            - confirm + tell "clone, remove origin, add origin, push -u"
         */
    }
}