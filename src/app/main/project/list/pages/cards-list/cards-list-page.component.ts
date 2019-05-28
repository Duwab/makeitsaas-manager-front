import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    templateUrl: './cards-list-page.component.html'
})
export class CardsListPageComponent {
    constructor(
        private _fuseConfigService: FuseConfigService
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
}