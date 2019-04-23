import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ListService } from './list.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector     : 'environment-detail',
    templateUrl  : './list.component.html',
    styleUrls    : ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ListComponent implements OnInit
{

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ListService} _detailService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _detailService: ListService
    )
    {
        console.log('DUH DUH DUH DUH DUH')
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