import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './pages/login/login-page.component';
import { OauthCallbackComponent } from './pages/oauth-callback/oauth-callback.component';
import { AnonymousGuard } from '@core/guards/anonymous.guard';
import { PageCenteredComponent } from 'app/layout/components/page-centered/page-centered.component';

const authenticationRoutes: Routes = [
    {
        path: 'login',
        canActivate: [AnonymousGuard],
        component: LoginPageComponent
    },
    {
        path: 'oauth/callback',
        component: PageCenteredComponent,
        children: [
            {
                path: ':strategy',
                component: OauthCallbackComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(authenticationRoutes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class AuthenticationRoutingModule {
}
