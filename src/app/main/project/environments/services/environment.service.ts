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
    last_configuration_id: string;
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
    private environmentSubjects: {[id: string]: BehaviorSubject<Environment>} = {};
    private environments: {[id: string]: Environment} = {};

    // last edited environment
    private editableConfigurationSubjects: {[id: string]: BehaviorSubject<any>} = {};
    private editableConfigurations: {[id: string]: any} = {};

    constructor(
        private navigationProjectService: NavigationProjectService,
        private httpClient: HttpClient
    ) {
    }

    getEnvironment(id: string): Observable<Environment> {
        if (!this.environmentSubjects[id]) {
            this.refetchEnvironment(id);
        }

        return this.environmentSubjects[id].asObservable();
    }

    getEditableConfiguration(environmentId: string): Observable<any> {
        if (!this.editableConfigurationSubjects[environmentId]) {
            this.resetEditableConfiguration(environmentId);
        }

        return this.editableConfigurationSubjects[environmentId].asObservable();
    }

    refetchEnvironment(id: string): void {
        if (!this.environmentSubjects[id]) {
            this.environmentSubjects[id] = new BehaviorSubject<Environment>(null);
        }
        this.httpClient.get(`${environment.apiBaseUrl}/environments/${id}`).subscribe((data: Environment) => {
            this.environments[id] = data;
            this.environmentSubjects[id].next(data);
            if (!this.editableConfigurationSubjects[id]) {
                this.resetEditableConfiguration(id)
            }
        });
    }

    resetEditableConfiguration(environmentId: string): void {
        if (!this.editableConfigurationSubjects[environmentId]) {
            this.editableConfigurationSubjects[environmentId] = new BehaviorSubject<any>(null);
        }

        const sub = this.getEnvironment(environmentId).subscribe(environment => {
            let newConfig = environment.configuration || {services: []};
            this.editableConfigurations[environmentId] = newConfig;
            this.editableConfigurationSubjects[environmentId].next(newConfig);
            setTimeout(() => sub.unsubscribe(), 1);
        })
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

    addService(environmentId: string, serviceLink: any): void {
        this.editableConfigurations[environmentId].services.push(serviceLink);
    }

    removeService(environmentId: string, serviceLink: any): void {
        let filteredServices = this.editableConfigurations[environmentId].services.filter(link => {
            console.log('link', serviceLink.path, link.path);
            return serviceLink.path !== link.path;
        });

        console.log('filtered', filteredServices);

        this.editableConfigurations[environmentId].services = filteredServices;
    }

    saveConfiguration(environmentId: string): Observable<any> {
        return this.httpClient
            .post(`${environment.apiBaseUrl}/environments/${environmentId}/configurations`, {
                last_configuration_id: this.environments[environmentId].last_configuration_id,
                override_configuration: this.editableConfigurations[environmentId]
            })
            .pipe(map((response: any) => {
                // this.editableConfigurations[environmentId] = null;
                this.refetchEnvironment(environmentId);
                return response;
            }));
    }

}
