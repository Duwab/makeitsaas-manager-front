import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationProjectService } from '../../services/navigation-project.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

interface Service {
    id: string;
    name: string;
    subpath: string;
}

interface Environment {
    id: string;
    name: string;
    domains: string[];
    configuration: {
        domains: any[];
        services: Service[];
    }
}

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {

    // last config fetched from API
    private environments: {[id: string]: BehaviorSubject<Environment>} = {};

    // last edited environment
    private editedEnvironment: {[id: string]: BehaviorSubject<Environment>} = {};

    constructor(
        private navigationProjectService: NavigationProjectService,
        private httpClient: HttpClient
    ) {
    }

    getEnvironment(id: string): Observable<Environment> {
        if (!this.environments[id]) {
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

    addDomain(environmentId: string, domain: string): Observable<any> {
        return this.httpClient
            .post(`${environment.apiBaseUrl}/environments/${environmentId}/domains`, {domain})
            .pipe(map((response: any) => {
                this.refetchEnvironment(environmentId);
                return response;
            }));
    }

    updateDomainName(environmentId: string, previous: string, next: string): Observable<any> {
        return this.httpClient
            .put(`${environment.apiBaseUrl}/environments/${environmentId}/domains`, {previous, next})
            .pipe(map((response: any) => {
                this.refetchEnvironment(environmentId);
                return response;
            }));
    }

    removeDomain(environmentId: string, domain: string): Observable<any> {
        return this.httpClient
            .delete(`${environment.apiBaseUrl}/environments/${environmentId}/domains/${domain}`)
            .pipe(map((response: any) => {
                this.refetchEnvironment(environmentId);
                return response;
            }));
    }

    addService(environmentId: string): Observable<any> {
        return this.getEnvironment(environmentId);
    }

}
