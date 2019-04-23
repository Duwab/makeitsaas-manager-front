import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { DetailService } from './detail.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector     : 'environment-detail',
    templateUrl  : './detail.component.html',
    styleUrls    : ['./detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DetailComponent implements OnInit
{

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {DetailService} _detailService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _detailService: DetailService
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