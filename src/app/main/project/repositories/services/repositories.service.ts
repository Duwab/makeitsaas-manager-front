import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface Service {
    id: string
    project_id: string
    name: string
    description: string
    type: string
    repository_url: string
    position: number
    createdAt: Date
    updatedAt: Date
}

@Injectable()
export class RepositoriesService {

    private servicesSubjects: {[id: string]: BehaviorSubject<Service[]>} = {};
    private services: {[id: string]: Service[]} = {};

    constructor(
        private httpClient: HttpClient
    ) {}

    getProjectRepositories(): Observable<Service[]> {
        const projectId = 1;
        if(!this.servicesSubjects[projectId]) {
            this.fetchProjectRepositories(projectId);
        }

        return this.servicesSubjects[projectId];
    }

    fetchProjectRepositories(projectId) {
        if(!this.servicesSubjects[projectId]) {
            this.servicesSubjects[projectId] = new BehaviorSubject([]);
        }

        this.httpClient.get(`${environment.apiBaseUrl}/projects/${projectId}/services`).subscribe(({services}: {services: Service[]}) => {
            this.services[projectId] = services;
            this.servicesSubjects[projectId].next(services);
        });
    }
}