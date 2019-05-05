import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';
import { EnvironmentService } from '../../../../services/environment.service';
import { ModalSubdomainEditorComponent } from '../modal-subdomain-editor/modal-subdomain-editor.component';
import { ModalServiceLinkEditorComponent } from '../modal-service-link-editor/modal-service-link-editor.component';

@Component({
    selector     : 'environment-architecture',
    templateUrl  : './environment-architecture.component.html',
    styleUrls    : ['./environment-architecture.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EnvironemntArchitectureComponent implements OnInit
{
    @Input() environmentId: string;

    environment: any;
    domains: any[] = [];
    services: any[] = [];
    configuration: any = {services:[]};

    /**
     * Constructor
     *
     */
    constructor(
        private environmentService: EnvironmentService,
        private dialog: MatDialog
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.environmentService.getEnvironment(this.environmentId).subscribe(environment => {
            if(environment) {
                this.environment = environment;
                this.domains = environment.domains;
                this.services = environment.configuration.services;
            }
        });

        this.environmentService.getEditableConfiguration(this.environmentId).subscribe(configuration => this.configuration = configuration);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    renameDomain(domainName) {
        this.dialog.open(ModalSubdomainEditorComponent, {
            width: '250px',
            data: {
                environmentId: this.environmentId,
                initialValue: domainName
            }
        });
    }

    deleteDomain(domainName) {
        this.environmentService.removeDomain(this.environmentId, domainName)
            .subscribe(() => {}, error => {alert('Delete error :' + error && error.message )});
    }

    renameServicePath(serviceId) {
        alert('Rename service path ' + serviceId);
    }

    updateService(serviceLink) {
        const dialogRef = this.dialog.open(ModalServiceLinkEditorComponent, {
            width: '500px',
            data: {
                environmentId: this.environmentId,
                initialValue: serviceLink
            }
        });

        dialogRef.afterClosed().subscribe(data => {
            if(data === 'remove') {
                console.log('remove link', serviceLink);
                this.environmentService.removeService(this.environmentId, serviceLink);
            } else if(data) {
                console.log('update link with', data);
                // maybe cleaner to use environmentService in this case
                for(let key in data) {
                    serviceLink[key] = data[key];
                }
            }
        });
    }

    showDatabase(serviceId) {
        alert('Show database from service ' + serviceId + ' (size, tables, backups, operations, ...)');
    }

}