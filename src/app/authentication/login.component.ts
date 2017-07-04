import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import 'rxjs/Rx';
import { MessagesService } from "../messages/messages.service";
import { Message } from "app/messages/messages.models";

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    errorMessage: string;
    pageTitle = 'Log In';
    userName: string;
    password: string;
    waiting: boolean;

    constructor(private authService: AuthService,
                private router: Router,
                private messageService: MessagesService) {
                    this.waiting = false;
                 }

    login(loginForm: NgForm) {
        if (loginForm && loginForm.valid) {
            let userName = loginForm.form.value.userName;
            let password = loginForm.form.value.password;
            this.waiting = true;
            this.authService.login(userName, password).subscribe(
                result => {
                    this.waiting = false;
                    if (result) {
                        var message = new Message();
                        message.text = `${userName} logged in`;
                        this.messageService.addMessage(message).subscribe(() => this.messageService.getAll(true));
                        if (this.authService.redirectUrl) {
                            this.router.navigateByUrl(this.authService.redirectUrl);
                        } else {
                            this.router.navigate(['/home']);
                        }
                    } else {
                        this.errorMessage = 'Please enter a user name and password.';
                    }
                },
                error => {
                    this.waiting = false;
                    this.errorMessage = 'Uw wachtwoord of gebruikersnaam is foutief.';
                }
            );
        }
    }
}