import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { OperationsService } from './operations.service';

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
     * @param {OperationsService} _detailService
     */
    constructor(
        private _operationsService: OperationsService
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

    createOperation() {
        alert('modal "create operation"');
        /*
            From one service
            To another service
            Diff generator
            - add/delete services
            - update/lock services
            - migrate services data
            - update proxy routes
         */
    }
}