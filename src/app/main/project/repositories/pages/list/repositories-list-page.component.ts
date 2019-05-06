import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from '../../services/repositories.service';

@Component({
    templateUrl: './repositories-list-page.component.html',
    styleUrls: ['./repositories-list-page.component.scss']
})
export class RepositoriesListPageComponent implements OnInit {

    public repositories: any[] = [];

    constructor(
        private repositoriesService: RepositoriesService
    ) {}

    ngOnInit() {
        this.repositoriesService.getProjectRepositories().subscribe(services => {
            this.repositories = services;
        });
    }

    create() {
        alert('create new repository')
    }
}