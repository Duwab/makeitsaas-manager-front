import { Component, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ProjectsService } from '../../../services/projects.service';
import { Project } from '../../../../models';
import { MatDialog } from '@angular/material';
import { ModalSubdomainEditorComponent } from '../../../environments/modules/detail/components/modal-subdomain-editor/modal-subdomain-editor.component';
import { ModalProjectCreateComponent } from '../../components/modal-project-create/modal-project-create.component';

@Component({
    selector: 'project-cards-list',
    templateUrl: './cards-list-page.component.html',
    styleUrls: ['./cards-list-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CardsListPageComponent {
    boards: any[];
    projects: Project[];

    constructor(
        private _fuseConfigService: FuseConfigService,
        private projectsService: ProjectsService,
        private dialog: MatDialog
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: false
                },
                footer: {
                    hidden: false
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.projectsService.getProjects().subscribe(projects => this.projects = projects);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        // this._unsubscribeAll.next();
        // this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New board
     */
    newProject(): void
    {
        this.dialog.open(ModalProjectCreateComponent, {
            width: '250px',
            data: {}
        });
    }
}