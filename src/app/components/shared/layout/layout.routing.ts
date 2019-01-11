import { Routes } from '@angular/router';

// Components
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UsersComponent } from '../../catalogs/users/users.component';
import { UserDetailComponent } from '../../catalogs/users/user-detail/user-detail.component';

export const LAYOUT_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'users', component: UsersComponent },
    { path: 'user-detail', component: UserDetailComponent },
    { path: '**', component: DashboardComponent }
];
