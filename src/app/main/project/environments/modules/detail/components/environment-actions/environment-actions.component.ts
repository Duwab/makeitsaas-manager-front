import { Component, Input } from '@angular/core';
import { EnvironmentService } from '../../../../services/environment.service';

@Component({
    selector: 'environment-actions',
    templateUrl: './environment-actions.component.html'
})
export class EnvironmentActionsComponent {
    @Input() environmentId: string;

    constructor(
        private environmentService: EnvironmentService
    ){}

    deploy() {
        alert('create deploy order');
    }

    save() {
        alert('save configuration');
    }

    addDomain() {
        this.environmentService.addDomain(this.environmentId);
    }

    addService() {
        this.environmentService.addService(this.environmentId);
        /*
            new service modal stepper :
            - blank service Vs distribution service
            - customize service config
            - confirm + tell "clone, remove origin, add origin, push -u"
         */
    }
}