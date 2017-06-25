import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Color } from "./mastermind.models";

@Injectable()
export class ColorService {
    private readonly color_url = "/assets/colors.json";

    constructor(private http: Http) { }

    public getColors(): Observable<Color[]> {
         return this.http.get(this.color_url)
            .map(result => result.json().map(item => new Color(item)))
            .catch(this._handleError);
    }

        
    _handleError(err: any) {
        console.log(err);
        return Observable.throw(err);
    }
}