import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { OperationsService } from './operations.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    templateUrl  : './operations.component.html',
    styleUrls    : ['./operations.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class OperationsComponent implements OnInit
{

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {OperationsService} _detailService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _detailService: OperationsService
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}