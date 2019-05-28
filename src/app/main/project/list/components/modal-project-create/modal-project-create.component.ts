import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../../services/projects.service';
import { CurrentUserService } from '../../../../authentication/services/current-user.service';

@Component({
    templateUrl: './modal-project-create.component.html',
    styleUrls: ['./modal-project-create.component.scss']
})
export class ModalProjectCreateComponent implements OnInit {

    public projectFormGroup: FormGroup;
    public userId;
    public loading = false;
    public errorMessage: any;

    constructor(
        private currentUserService: CurrentUserService,
        private projectsService: ProjectsService,
        public dialogRef: MatDialogRef<ModalProjectCreateComponent>,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: {}
    ) {
        this.projectFormGroup = this.fb.group({
            'name': new FormControl('', [Validators.required]),
        });
    }

    ngOnInit() {
        let user = this.currentUserService.getUser();
        this.userId = user && user.id;
    }

    cancel(): void {
        this.dialogRef.close();
    }

    createProject(): void {
        let body = {...this.projectFormGroup.value, user_id: this.userId};

        if(this.loading)
            return;
        this.loading = true;

        this.projectsService.createProject(body).subscribe(() => {
            this.loading = false;
            this.dialogRef.close(body);
            this.snackBar.open("Project created", undefined, {
                duration: 2000
            });
        }, errorResponse => {
            this.loading = false;
            this.errorMessage = errorResponse.error && errorResponse.error.error || errorResponse;
        })
    }
}