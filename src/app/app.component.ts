import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from "@angular/router";

import { AuthService } from "./authentication/auth.service";

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
              public _auth: AuthService) {
    router.events.subscribe((routerEvent : Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  logout() : void {
    this._auth.logout();
    this.router.navigate(['/home']);
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
  
}

