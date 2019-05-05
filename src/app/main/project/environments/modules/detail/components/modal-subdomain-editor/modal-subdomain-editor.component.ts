import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { EnvironmentService } from '../../../../services/environment.service';

const DOMAIN_PATTERN = "^([a-z1-9\-]+)(\\\.[a-z1-9\-]+)+\\\.([a-z1-9\-]+)$";

@Component({
    templateUrl: './modal-subdomain-editor.component.html'
})
export class ModalSubdomainEditorComponent implements OnInit {

    public domainPattern = DOMAIN_PATTERN;
    public domainFormControl = new FormControl('', [
        Validators.required
    ]);
    public environmentId;
    public isUpdate = false;
    public loading = false;
    public errorMessage: any;

    constructor(
        private environmentService: EnvironmentService,
        public dialogRef: MatDialogRef<ModalSubdomainEditorComponent>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: {
            environmentId: string
            initialValue?: string
        }
    ) {}

    ngOnInit() {
        this.environmentId = this.data.environmentId;
        if(this.data.initialValue) {
            this.isUpdate = true;
            this.domainFormControl.setValue(this.data.initialValue);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    createDomain(): void {
        let formValue = this.domainFormControl.value,
            httpQuery = this.isUpdate ?
                this.environmentService.updateDomainName(this.environmentId, this.data.initialValue, formValue)
                : this.environmentService.addDomain(this.environmentId, formValue);

        this.loading = true;

        httpQuery.subscribe(() => {
            this.loading = false;
            this.dialogRef.close(this.domainFormControl.value);
            this.snackBar.open("Domain saved", undefined, {
                duration: 2000
            });
        }, errorResponse => {
            this.loading = false;
            this.errorMessage = errorResponse.error && errorResponse.error.error;
        })
    }
}