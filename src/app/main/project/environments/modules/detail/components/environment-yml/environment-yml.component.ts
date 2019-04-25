import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
        this.httpClient
            .get(`http://localhost:3000/environments/${this.environmentId}/deployment-order`)
            .subscribe(({order}: any) => {
                this.order = order;
            })
    }
}