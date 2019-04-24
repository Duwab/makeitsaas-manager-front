import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseConfigService } from '@fuse/services/config.service';

interface Project {
    id: string
}

@Injectable()
export class NavigationProjectService {

    private currentProjectId: string;
    private currentProjectSubject: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);

    private projectUrls = {
        'project-dashboard-analytics': '/projects/:project_id/dashboards/analytics',
        'project-dashboard-project': '/projects/:project_id/dashboards/project',
        'team': '/projects/:project_id/team',
        'servers': '/projects/:project_id/servers',
        'all-projects': '/projects/:project_id/all-projects',
        'workflow-global': '/projects/:project_id/workflows/list',
        'workflow-operations': '/projects/:project_id/workflows/operations',
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseConfigService: FuseConfigService
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

    onProject(): Observable<Project> {
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

    }
}