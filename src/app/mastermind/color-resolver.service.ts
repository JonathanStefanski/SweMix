import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { ColorService } from "./color.service";
import { Color } from "./mastermind.models";

@Injectable()
export class ColorsResolver implements Resolve<Color[]> {
    constructor(
        private _colorService: ColorService,
        private _router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Color[]> {
        return this._colorService.getColors()
            .catch(error => {
                console.log(`Retrievel error: ${error}`);
                this._router.navigate(['/error']);
                return Observable.of(null);
            });
    }
}