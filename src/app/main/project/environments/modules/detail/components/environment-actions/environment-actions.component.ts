import { Component, Input } from '@angular/core';
import { EnvironmentService } from '../../../../services/environment.service';
import { ModalAddDomainComponent } from '../modal-add-domain/modal-add-domain.component';
import { MatDialog, MatSnackBar } from '@angular/material';

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
        const dialogRef = this.dialog.open(ModalAddDomainComponent, {
            width: '250px',
            data: {
                environmentId: this.environmentId
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.snackBar.open("Domain saved", undefined, {
                    duration: 2000
                });
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