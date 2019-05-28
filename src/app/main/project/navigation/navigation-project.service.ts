import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

interface Project {
    id: string
}

@Injectable({
    providedIn: 'root'
})
export class NavigationProjectService {

    private currentProjectId: string;
    private currentProjectSubject: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);

    private environmentUrl = '/projects/:project_id/environments/:environment_id';

    private projectUrls = {
        'project-dashboard-analytics': '/projects/:project_id/dashboards/analytics',
        'project-dashboard-management': '/projects/:project_id/dashboards/management',
        'environments-overview': '/projects/:project_id/environments/list',
        'repositories-list': '/projects/:project_id/repositories/list',
        'team': '/projects/:project_id/team',
        'servers': '/projects/:project_id/servers',
        'workflow-global': '/projects/:project_id/workflows/list',
        'workflow-operations': '/projects/:project_id/workflows/operations',
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseConfigService: FuseConfigService,
        private httpClient: HttpClient
    ) {
        const onProjectId = (id) => {
            if(id !== this.currentProjectId) {
                this.currentProjectId = id;
                this.currentProjectSubject.next({
                    id: id
                });
                this.applyParamChange(id);
            }
        };

        this.router.events.subscribe(e => {
            let paramProjectId = this.route.snapshot.firstChild && this.route.snapshot.firstChild.params.project_id;
            onProjectId(paramProjectId);
        });

    }

    getCurrentProjectId(): string {
        return this.currentProjectId;
    }

    projectObservable(): Observable<Project> {
        return this.currentProjectSubject;
    }

    applyParamChange(projectId) {
        for(let itemKey in this.projectUrls) {
            this._fuseNavigationService.updateNavigationItem(itemKey, {
                url: projectId && this.projectUrls[itemKey].replace(':project_id', projectId) || ''
            });
        }
        if(!projectId) {
            this._fuseConfigService.setConfig({
                'layout': {
                    'navbar': {
                        'position': 'none'
                    }
                }
            })
        } else {
            this._fuseConfigService.setConfig({
                //'fuseConfig.layout.navbar.position': 'left'
            })
        }

        this.refreshEnvironmentsList();
    }

    refreshEnvironmentsList() {
        if(this.currentProjectId) {
            this.httpClient
                .get(`${environment.apiBaseUrl}/projects/${this.currentProjectId}/environments`)
                .subscribe((response: any) => {
                    this.applyEnvironmentsNavigation(response.environments);
                });
        } else {
            this.applyEnvironmentsNavigation(null);
        }
    }

    applyEnvironmentsNavigation(environments) {
        const links = environments && environments.map(env => {
            const url = this.environmentUrl
                .replace(':project_id', this.currentProjectId)
                .replace(':environment_id', env.id);
            return {
                id       : `env-detail-${env.id}`,
                title    : env.name || `Env ${env.id}`,
                type     : 'item',
                url      : url,
            }
        });
        setTimeout(() => {  // dirty fix to wait for fuse render lifecycle end
            this._fuseNavigationService.updateNavigationItem('environments-details', {
                badge    : {
                    title    : links ? links.length : 0,
                    bg       : '#555',
                    fg       : '#FFFFFF'
                },
                children: links
            });
        }, 500);
    }
}