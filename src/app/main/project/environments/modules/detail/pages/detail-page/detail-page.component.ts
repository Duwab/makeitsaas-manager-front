import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './detail-page.component.html'
})
export class DetailPageComponent {
    environment: {id: string|number};

    constructor(
        private activeRoute: ActivatedRoute
    ) {
        this.activeRoute.params.subscribe(params => {
            this.environment = null;

            setTimeout(() => {
                this.environment = {
                    id: params.environment_id
                }
            }, 1000);
        })
    }
}