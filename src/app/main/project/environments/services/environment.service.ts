import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationProjectService } from '../../services/navigation-project.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

interface Service {
    id: string;
    name: string;
    subpath: string;
}

interface Environment {
    id: string;
    configuration: {
        domains: any[];
        services: Service[];
    }
}

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {

    private environments: {[id: string]: BehaviorSubject<Environment>} = {};

    constructor(
        private navigationProjectService: NavigationProjectService,
        private httpClient: HttpClient
    ) {
    }

    getEnvironment(id: string): Observable<Environment> {
        if (!this.environments[id]) {
            //const mockValue: Environment = environmentsMock[id] || this.generateMockEnvironment(id);
            this.refetchEnvironment(id);
        }

        return this.environments[id].asObservable();
    }

    refetchEnvironment(id: string): void {
        if (!this.environments[id]) {
            this.environments[id] = new BehaviorSubject<Environment>(null);
        }
        this.httpClient.get(`${environment.apiBaseUrl}/environments/${id}`).subscribe((data: Environment) => {
            this.environments[id].next(data);
        });
    }

    addDomain(environmentId: string): Observable<any> {
        // this.refreshEnvironment(environmentId);
        return this.getEnvironment(environmentId);
    }

    addService(environmentId: string): Observable<any> {
        // this.refreshEnvironment(environmentId);
        return this.getEnvironment(environmentId);
    }

}
