import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { EnvironmentService } from '../../../../services/environment.service';

const DOMAIN_PATTERN = "^([a-z1-9\-]+)(\\\.[a-z1-9\-]+)+\\\.([a-z1-9\-]+)$";

@Component({
    templateUrl: './modal-add-domain.component.html'
})
export class ModalAddDomainComponent {

    public domainPattern = DOMAIN_PATTERN;
    public domainFormControl = new FormControl('', [
        Validators.required
    ]);
    public loading = false;
    public serverError: any;

    constructor(
        private environmentService: EnvironmentService,
        public dialogRef: MatDialogRef<ModalAddDomainComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    createDomain(): void {
        this.loading = true;
        this.environmentService.addDomain(this.data.environmentId, this.domainFormControl.value).subscribe(response => {
            this.loading = false;
            this.dialogRef.close(this.domainFormControl.value);
        }, error => {
            this.loading = false;
            this.serverError = error;
        })
    }
}