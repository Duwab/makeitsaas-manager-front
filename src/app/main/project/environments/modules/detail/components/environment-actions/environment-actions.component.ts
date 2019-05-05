import { Component, Input } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ModalSubdomainEditorComponent } from '../modal-subdomain-editor/modal-subdomain-editor.component';
import { ModalServiceLinkEditorComponent } from '../modal-service-link-editor/modal-service-link-editor.component';
import { EnvironmentService } from '../../../../services/environment.service';

@Component({
    selector: 'environment-actions',
    templateUrl: './environment-actions.component.html'
})
export class EnvironmentActionsComponent {
    @Input() environmentId: string;

    constructor(
        private dialog: MatDialog,
        private environmentService: EnvironmentService,
        private snackBar: MatSnackBar
    ){}

    deploy() {
        alert('create deploy order');
    }

    save() {
        this.environmentService.saveConfiguration(this.environmentId).subscribe(() => {
            this.snackBar.open("Configuration saved", undefined, {
                duration: 2000
            });
        }, error1 => {
            console.log('error', error1)
        });
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
        const dialogRef = this.dialog.open(ModalServiceLinkEditorComponent, {
            width: '500px',
            data: {
                environmentId: this.environmentId
            }
        });

        dialogRef.afterClosed().subscribe(serviceLink => {
            if(serviceLink) {
                console.log('service link', serviceLink);
                this.environmentService.addService(this.environmentId, serviceLink);
            }
        });
        /*
            new service modal stepper :
            - blank service Vs distribution service
            - customize service config
            - confirm + tell "clone, remove origin, add origin, push -u"
         */
    }
}