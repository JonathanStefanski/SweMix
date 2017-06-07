import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import 'rxjs/Rx';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
})
export class LoginComponent {
    errorMessage: string;
    pageTitle = 'Log In';
    userName: string;
    password: string;

    constructor(private authService: AuthService,
                private router: Router) { }

    login(loginForm: NgForm) {
        if (loginForm && loginForm.valid) {
            let userName = loginForm.form.value.userName;
            let password = loginForm.form.value.password;
            this.authService.login(userName, password).subscribe(
                result => {
                    if (result) {
                        if (this.authService.redirectUrl) {
                            this.router.navigateByUrl(this.authService.redirectUrl);
                        } else {
                            this.router.navigate(['/home']);
                        }
                    } else {
                        this.errorMessage = 'Please enter a user name and password.';
                    }
                }
            );
        }
    }
}