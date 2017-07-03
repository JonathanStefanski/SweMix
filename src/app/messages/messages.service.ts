import { Injectable } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

@Injectable()
export class MessagesService {
    private messages: string[] = [];
    isDisplayed:boolean = false;

    constructor(private router: Router){
        router.events.subscribe(e => {
            if (e instanceof NavigationStart) {
                if (e.url.indexOf('(popup') > -1){ this.isDisplayed = true}
            }
        });
    }

    getAll(): string[] {
        return this.messages;
    }

    addMessage(message: string): void {
        let currentDate = new Date();
        this.messages.unshift(message + ' at ' + currentDate.toLocaleString());
    }
}