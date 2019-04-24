import { Component, Input } from '@angular/core';

@Component({
    selector: 'environment-yml',
    templateUrl: './environment-yml.component.html'
})
export class EnvironmentYmlComponent {
    @Input() environmentId: string;
}