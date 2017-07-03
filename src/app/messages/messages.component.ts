import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MessagesService } from "./messages.service";

@Component({
    moduleId: module.id,
    templateUrl: 'messages.component.html',
    styleUrls: ['messages.component.css']
})

export class MessagesComponent implements OnInit {
    messages: string[];
    constructor(
        private router: Router,
        private messageService: MessagesService
    ) { }

    ngOnInit() {
        this.messages = this.messageService.getAll();
     }

    close(): void {
        // Close the popup.
        this.router.navigate([{ outlets: { popup: null } }]);
        this.messageService.isDisplayed = false;
    }
}