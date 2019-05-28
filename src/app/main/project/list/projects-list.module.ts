import { NgModule } from '@angular/core';
import { CardsListPageComponent } from './pages/cards-list/cards-list-page.component';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: '',
        component: CardsListPageComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [CardsListPageComponent]
})
export class ProjectsListModule {}