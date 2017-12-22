import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({   
    moduleId: module.id, 
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent {    
    public pageTitle: string = 'Welcome';
    public lastUpdated: Date = environment.lastUpdated;
    public imagePath: string = '../assets/images/home.png'
}
