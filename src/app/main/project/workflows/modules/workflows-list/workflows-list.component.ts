import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { WorkflowsListService } from './workflows-list.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    templateUrl  : './workflows-list.component.html',
    styleUrls    : ['./workflows-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class WorkflowsListComponent implements OnInit
{

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {WorkflowsListService} _detailService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _detailService: WorkflowsListService
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