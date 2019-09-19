import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';

@Component({
    selector: 'environment-yml',
    templateUrl: './environment-yml.component.html'
})
export class EnvironmentYmlComponent {
    @Input() environmentId: string;
    order: any;

    constructor(
        private httpClient: HttpClient
    ) {}

    ngOnInit() {
        console.log('deploy environment', environment);
        this.httpClient
            .get(`${environment.apiBaseUrl}/environments/${this.environmentId}/deployment-order`)
            .subscribe(({order}: any) => {
                this.order = order;
            })
    }
}