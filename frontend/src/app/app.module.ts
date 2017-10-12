import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, ActivatedRouteSnapshot } from '@angular/router';


import { AuthService } from './services/auth.service';
import { SearchService } from "app/services/search.service";
import { CanActivateViaAuthGuard } from "app/guards/auth-guard";
import { LoginGuard } from "app/guards/login-guard";

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { LogoutComponent } from './logout/logout.component';
import { CaseService } from "app/services/case.service";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from "app/services/user.service";
import { CeiboShare } from "app/directive/share";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path:'blood/:id', component:CaseDetailsComponent},
  { path:'cash/:id', component:CaseDetailsComponent},
  { path:'volunteer/:id', component:CaseDetailsComponent},
  { path:'profile/me', component:UserProfileComponent, canActivate:[CanActivateViaAuthGuard]},
  { path: 'signup', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'logout', component: LogoutComponent }, 
//  { path: 'profile',component:ProfileViewComponent, canActivate: [CanActivateViaAuthGuard]},
  { path: '**', component: PageNotFoundComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    LogoutComponent,
    CaseDetailsComponent,
    UserProfileComponent,
    CeiboShare
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService,SearchService,UserService,CaseService,LoginGuard, CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
