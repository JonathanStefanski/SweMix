import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MessagesService } from "./messages.service";

@Component({
    moduleId: module.id,
    templateUrl: 'messages.component.html',
    styleUrls: ['messages.component.css']
})

export class MessagesComponent implements OnInit {
    constructor(
        private router: Router,
        private messageService: MessagesService
    ) { }

    ngOnInit() { }

    close(): void {
        // Close the popup.
        this.router.navigate([{ outlets: { popup: null } }]);
        this.messageService.isDisplayed = false;
    }
}