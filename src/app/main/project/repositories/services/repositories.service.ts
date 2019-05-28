import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from '../../../models';
import { NavigationProjectService } from '../../navigation/navigation-project.service';

@Injectable()
export class RepositoriesService {

    private servicesSubjects: {[id: string]: BehaviorSubject<Repository[]>} = {};
    private services: {[id: string]: Repository[]} = {};

    constructor(
        private httpClient: HttpClient,
        private navigationProjectService: NavigationProjectService
    ) {}

    getProjectRepositories(): Observable<Repository[]> {
        const projectId = this.navigationProjectService.getCurrentProjectId();
        if(!this.servicesSubjects[projectId]) {
            this.fetchProjectRepositories(projectId);
        }

        return this.servicesSubjects[projectId];
    }

    fetchProjectRepositories(projectId) {
        if(!this.servicesSubjects[projectId]) {
            this.servicesSubjects[projectId] = new BehaviorSubject([]);
        }

        this.httpClient.get(`${environment.apiBaseUrl}/projects/${projectId}/services`).subscribe(({services}: {services: Repository[]}) => {
            this.services[projectId] = services;
            this.servicesSubjects[projectId].next(services);
        });
    }

    createRepository(projectId, options): Observable<any> {
        return this.httpClient.post(`${environment.apiBaseUrl}/services`, {
            ...options,
            project_id: projectId
        }).pipe(map(responseBody => {
            this.fetchProjectRepositories(projectId);
            return responseBody;
        }));
    }
}