import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from "@angular/router";

import { AuthService } from "./authentication/auth.service";
import { MessagesService } from "./messages/messages.service";
import { Message } from "app/messages/messages.models";

@Component({
  moduleId: module.id,
  selector: 'swe-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {  
  title = 'S.S.O. (SweMix Song Organizer)';
  loading: boolean = true;

  constructor(private router: Router,
              public _auth: AuthService,
              public messageService: MessagesService) {
    router.events.subscribe((routerEvent : Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  logout() : void {
    var message = new Message();
    message.text = `${this._auth.currentUser.userName} logged out`;    
    this.messageService.addMessage(message).subscribe(
      () => {                
        this._auth.logout();             
        this.router.navigate([{ outlets: { primary: ['home'], popup: null } }]);
        this.messageService.isDisplayed = false;   
      }
    );        
  }

  checkRouterEvent(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {      
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  displayMessages(): void {
        // Example of primary and secondary routing together
        // this.router.navigate(['/login', {outlets: { popup: ['messages']}}]); // Does not work
        // this.router.navigate([{outlets: { primary: ['login'], popup: ['messages']}}]); // Works
        this.router.navigate([{outlets: { popup: ['messages']}}]); // Works
        this.messageService.isDisplayed = true;
    }

    hideMessages(): void {
        this.router.navigate([{ outlets: { popup: null } }]);
        this.messageService.isDisplayed = false;
    }

}

