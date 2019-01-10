import { Routes } from '@angular/router';

// Components
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UsersComponent } from '../../catalogs/users/users.component';

export const LAYOUT_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'users', component: UsersComponent },
    { path: '**', component: DashboardComponent }
];
