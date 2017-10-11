import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './user/users.component';
import { CanActivateViaAuthGuard } from "app/guards/auth-guard";
import { AuthService } from '../services/auth.service';


const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [CanActivateViaAuthGuard],
        children: [
            {
                path: 'users', component: UsersComponent,
                resolve: {
                }

            }
//            { path: '', component: CampusesComponent },
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {
}