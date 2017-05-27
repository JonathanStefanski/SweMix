import { Component } from '@angular/core';

@Component({
    template: `
    <p>These are not the pages you are looking for!</p>
    `
})
export class Page404Component { }

@Component({
    template: `
    <p>Something went wrong while processing your request. Please try again later.</p>
    `
})
export class PageErrorComponent { }