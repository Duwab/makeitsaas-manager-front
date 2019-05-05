import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';
import { EnvironmentService } from '../../../../services/environment.service';
import { ModalSubdomainEditorComponent } from '../modal-subdomain-editor/modal-subdomain-editor.component';

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

    updateService(serviceId) {
        alert('Update service ' + serviceId + ' (repo, name, drop, ...)');
    }

    showDatabase(serviceId) {
        alert('Show database from service ' + serviceId + ' (size, tables, backups, operations, ...)');
    }

}