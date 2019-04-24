import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './detail-page.component.html'
})
export class DetailPageComponent {
    workflow: {id: string|number};

    constructor(
        private activeRoute: ActivatedRoute
    ) {
        this.activeRoute.params.subscribe(params => {
            this.workflow = null;

            setTimeout(() => {
                this.workflow = {
                    id: params.workflow_id
                }
            }, 1000);
        })
    }
}