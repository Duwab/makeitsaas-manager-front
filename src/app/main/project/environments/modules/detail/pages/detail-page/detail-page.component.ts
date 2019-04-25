import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './detail-page.component.html',
    styleUrls: ['./detail-page.component.scss']
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

    renameEnvironment() {
        alert('Rename environment');
    }

    deleteEnvironment() {
        alert('Delete environment');
    }
}