import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvironmentService } from '../../../../services/environment.service';

@Component({
    templateUrl: './detail-page.component.html',
    styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent {
    environment: any;

    constructor(
        private activeRoute: ActivatedRoute,
        private environmentService: EnvironmentService
    ) {
        this.activeRoute.params.subscribe(params => {
            this.environment = null;

            setTimeout(() => {  // dirty fix to force refresh
                this.environmentService.getEnvironment(params.environment_id).subscribe(env => {
                    this.environment = env;
                });
            }, 1);
        })
    }

    renameEnvironment() {
        alert('Rename environment');
    }

    deleteEnvironment() {
        alert('Delete environment');
    }
}