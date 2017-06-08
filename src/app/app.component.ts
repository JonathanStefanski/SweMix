import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "./authentication/auth.service";

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {  
  title = 'S.S.O. (SweMix Song Organizer)';

  constructor(private router: Router,
              public _auth: AuthService) { }

  logout() : void {
    this._auth.logout();
    this.router.navigate(['/home']);
  }
}

