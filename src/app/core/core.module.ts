import { NgModule } from '@angular/core';
import { Error404Component } from './templates/error-404/error-404.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ExampleInterceptor } from './interceptors/example.interceptor';
import { InvalidTokenInterceptor } from './interceptors/invalid-token.interceptor';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        HttpClientModule,
        RouterModule
    ],
    declarations: [
        Error404Component
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ExampleInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InvalidTokenInterceptor,
            multi: true
        },
    ]
})
export class CoreModule {
}
