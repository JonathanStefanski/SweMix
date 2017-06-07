import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

import { AppSharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    AppSharedModule,    
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthModule { }
