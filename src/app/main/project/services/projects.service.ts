import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../../models';

@Injectable()
export class ProjectsService {

    private projectsSubjects: BehaviorSubject<Project[]>;
    private projects: Project[];

    constructor(
        private httpClient: HttpClient
    ) {}

    getProjects(): Observable<Project[]> {
        const projectId = 1;
        if(!this.projectsSubjects) {
            this.fetchProjects();
        }

        return this.projectsSubjects;
    }

    fetchProjects() {
        if(!this.projectsSubjects) {
            this.projectsSubjects = new BehaviorSubject(null);
        }

        this.httpClient.get(`${environment.apiBaseUrl}/projects`).subscribe(({projects}: {projects: Project[]}) => {
            this.projects = projects;
            this.projectsSubjects.next(projects);
        });
    }

    createProject(options): Observable<any> {
        return this.httpClient.post(`${environment.apiBaseUrl}/projects`, options).pipe(map(responseBody => {
            this.fetchProjects();
            return responseBody;
        }));
    }
}