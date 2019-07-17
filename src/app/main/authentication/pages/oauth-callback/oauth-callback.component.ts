import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { delay, throttle } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
    templateUrl: './oauth-callback.component.html',
    styleUrls: ['./oauth-callback.component.scss']
})
export class OauthCallbackComponent implements OnInit {

    private strategy: string;
    private providerCode: string;

    loading = false;
    successMessage: string;
    errorMessage: string;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router,
        private _fuseConfigService: FuseConfigService
    ) {
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

    ngOnInit() {
        this.strategy = this.route.snapshot.paramMap.get('strategy');
        this.providerCode = this.route.snapshot.queryParamMap.get('code');

        this.clearUrl().then(() => {
          this.handleCode();
        });
    }

    clearUrl() {
        return this.router.navigate(
            ['.'],
            {relativeTo: this.route, queryParams: {}}
        );
    }

    handleCode() {
        if (this.strategy && this.providerCode) {
            this.loading = true;
            this.authService
                .sendAuthorizationCode(this.providerCode, this.strategy)
                .pipe(delay(1000))
                // .pipe(throttle(() => interval(2000)))
                .subscribe(() => {
                    this.loading = false;
                    this.successMessage = 'Successfully signed in !';
                    this.waitAndNavigate('/');
                }, errorInfo => {
                    this.loading = false;
                    if (errorInfo.error) {
                        this.errorMessage = errorInfo.error.message;
                    } else {
                        this.errorMessage = errorInfo.message || errorInfo;
                    }
                    this.waitAndNavigate('/login', 5000);
                });
        } else {
            this.waitAndNavigate('/login', 500);
        }
    }

    waitAndNavigate(path, delay = 2000) {
        setTimeout(() => this.router.navigate([path]), delay);
    }
}
