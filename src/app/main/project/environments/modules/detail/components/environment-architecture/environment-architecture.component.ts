import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { EnvironmentService } from '../../../../services/environment.service';

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
    domains: string[] = [];
    services: any[] = [];

    /**
     * Constructor
     *
     */
    constructor(
        private environmentService: EnvironmentService
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
            this.environment = environment;
            this.domains = environment.domains;
            this.services = environment.services;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    renameDomain(domainName) {
        alert('Rename domain ' + domainName);
    }

    deleteDomain(domainName) {
        alert('Delete domain ' + domainName);
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