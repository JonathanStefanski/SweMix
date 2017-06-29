import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from '../shared/shared.module';

import { MessagesComponent } from './messages.component';
import { MessagesService } from './messages.service';

@NgModule({
    imports: [
        AppSharedModule,
        RouterModule.forChild([
            {
                path: 'messages',
                component: MessagesComponent,
                outlet: 'popup'
            }
        ])
    ],
    declarations: [
        MessagesComponent
    ],
    providers: [
        MessagesService
    ]
})
export class MessagesModule { }
