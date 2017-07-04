import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MessagesService } from "./messages.service";
import { Observable } from "rxjs/Rx";
import { Message } from "./messages.models";

@Component({
    moduleId: module.id,
    templateUrl: 'messages.component.html',
    styleUrls: ['messages.component.css']
})

export class MessagesComponent implements OnInit {
    messages: Message[];
    constructor(
        private router: Router,
        private messageService: MessagesService
    ) { }

    ngOnInit() {
       this.messageService.getAll().subscribe(
            messages => this.messages = messages
        );
     }

    close(): void {
        // Close the popup.
        this.router.navigate([{ outlets: { popup: null } }]);
        this.messageService.isDisplayed = false;
    }
}