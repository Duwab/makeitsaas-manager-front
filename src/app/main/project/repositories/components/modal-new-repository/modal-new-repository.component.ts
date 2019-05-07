import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatStepper } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './modal-new-repository.component.html',
    styleUrls: ['./modal-new-repository.component.scss']
})
export class ModalNewRepositoryComponent implements OnInit {

    mobileView = false;
    step1Form: FormGroup;

    @ViewChild('stepper') stepper: MatStepper;

    constructor(
        public dialogRef: MatDialogRef<ModalNewRepositoryComponent>,
        private snackBar: MatSnackBar,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.mobileView = window.innerWidth <= 400;
        this.step1Form = this.fb.group({
            'template': [, Validators.required]
        });
    }

    selectTemplate(value) {
        this.step1Form.get('template').setValue(value);
    }

    onResize(e) {
        this.mobileView = e.target.innerWidth <= 400;
    }

    cancel() {
        this.dialogRef.close();
    }
}