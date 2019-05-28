import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginPageComponent {

    loginForm: FormGroup;
    githubOAuthUrl = environment.apiAuthenticationBaseUrl + '/oauth/github';
    errorMessage: string;
    loading = false;
    redirectPath: string;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });

        this.route.queryParams.subscribe(params => {
            this.redirectPath = params.redirect;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------

    onSubmit() {
        if (this.loading) return;

        this.loading = true;
        this.loginForm.disable();

        this.authService.login(
            this.loginForm.get('username').value,
            this.loginForm.get('password').value
        ).subscribe(() => {
            this.loading = false;
            this.loginForm.enable();
            this.errorMessage = '';
            this.redirectUser();
            // this.currentUserService.onUserJWT(response.token);
        }, info => {
            this.loading = false;
            this.loginForm.enable();
            console.error(info);
            if (info.error) {
                this.errorMessage = info.error.message
            } else {
                this.errorMessage = info;
            }
        });
    }

    redirectUser() {
        if(this.redirectPath) {
            this.router.navigate([this.redirectPath]);
        } else {
            this.router.navigate(['/'])
        }
    }
}
