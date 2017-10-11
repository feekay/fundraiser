import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './dashboard.routing-module';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './user/users.component';


import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { CanActivateViaAuthGuard } from "app/guards/auth-guard";



@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
    UsersComponent,
  ],
  providers: [
    CanActivateViaAuthGuard,
    AuthService
    ]
})
export class DashboardModule { }
