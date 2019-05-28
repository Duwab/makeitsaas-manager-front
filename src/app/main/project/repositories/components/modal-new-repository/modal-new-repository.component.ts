import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatStepper } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RepositoryEditorService } from '../../services/repository-editor.service';
import { RepositoriesService } from '../../services/repositories.service';

@Component({
    templateUrl: './modal-new-repository.component.html',
    styleUrls: ['./modal-new-repository.component.scss']
})
export class ModalNewRepositoryComponent implements OnInit {

    loading = false;
    mobileView = false;
    submitError: any;
    step0Form: FormGroup;
    step1Form: FormGroup;
    step2Form: FormGroup;

    @ViewChild('stepper') stepper: MatStepper;

    constructor(
        public dialogRef: MatDialogRef<ModalNewRepositoryComponent>,
        private snackBar: MatSnackBar,
        private fb: FormBuilder,
        private repositoriesService: RepositoriesService,
        @Inject(MAT_DIALOG_DATA) public data: {
            project_id: string
        }
    ) {}

    ngOnInit() {
        this.mobileView = window.innerWidth <= 400;
        this.step0Form = this.fb.group({
            'type': [, Validators.required],
        });
        this.step1Form = this.fb.group({
            'template': [, Validators.required]
        });
        this.step2Form = this.fb.group({
            'name': [, Validators.required],
            'description': [, Validators.required],
            'repository_url': [, Validators.required],
        });
    }

    selectTemplate(value) {
        this.step1Form.get('template').setValue(value);
        const defaultRepositoryURL = value === 'custom'
            ? 'https://github.com/makeitsaas/makeitsaas-microservice'
            : 'https://github.com/makeitsaas/makeitsaas-authentication';

        if(!this.step2Form.get('repository_url').value) {
            this.step2Form.get('repository_url').setValue(defaultRepositoryURL);
        }

        if(!this.step2Form.get('name').value) {
            this.step2Form.get('name').setValue(`Some ${value}`);
        }
    }

    getRecap() {
        return {
            type: this.step0Form.get('type').value,
            name: this.step2Form.get('name').value,
            description: this.step2Form.get('description').value,
            repository_url: this.step2Form.get('repository_url').value,
        }
    }

    onResize(e) {
        this.mobileView = e.target.innerWidth <= 400;
    }

    save() {
        if(!this.loading) {
            this.loading = true;
            this.submitError = null;
            this.repositoriesService.createRepository(this.data.project_id, this.getRecap()).subscribe(
                () => this.dialogRef.close(),
                error => (console.log('error', error), this.loading = false, this.submitError=error)
            );
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}