import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from '../../services/repositories.service';
import { RepositoryEditorService } from '../../services/repository-editor.service';

@Component({
    templateUrl: './repositories-list-page.component.html',
    styleUrls: ['./repositories-list-page.component.scss']
})
export class RepositoriesListPageComponent implements OnInit {

    public repositories: any[] = [];

    constructor(
        private repositoriesService: RepositoriesService,
        private repositoryEditorService: RepositoryEditorService
    ) {}

    ngOnInit() {
        this.repositoriesService.getProjectRepositories().subscribe(services => {
            this.repositories = services;
        });
    }

    create() {
        this.repositoryEditorService.launchCreateFormDialog();
    }
}