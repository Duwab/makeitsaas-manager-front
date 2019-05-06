import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './modal-service-link-editor.component.html',
    styleUrls: ['./modal-service-link-editor.component.scss']
})
export class ModalServiceLinkEditorComponent implements OnInit {

    public serviceLinkFormGroup: FormGroup;
    public environmentId;
    public isUpdate = false;
    public loading = false;
    public errorMessage: any;

    constructor(
        public dialogRef: MatDialogRef<ModalServiceLinkEditorComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: {
            environmentId: string
            initialValue?: any
        }
    ) {
        this.serviceLinkFormGroup = this.fb.group({
            'service_id': new FormControl('', [Validators.required]),
            'path': new FormControl('', [Validators.required]),
            'version': new FormControl('', []),
        });
    }

    ngOnInit() {
        this.environmentId = this.data.environmentId;
        if(this.data.initialValue) {
            this.isUpdate = true;
            this.serviceLinkFormGroup.patchValue(this.data.initialValue);
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }

    remove(): void {
        this.dialogRef.close("remove");
    }

    updateLink(): void {
        this.dialogRef.close(this.serviceLinkFormGroup.value);
    }
}