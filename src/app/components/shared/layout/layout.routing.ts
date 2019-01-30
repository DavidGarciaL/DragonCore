import { Routes } from '@angular/router';

// Components
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UsersComponent } from '../../catalogs/users/users.component';
import { UserDetailComponent } from '../../catalogs/users/user-detail/user-detail.component';
import { RolesComponent } from '../../catalogs/roles/roles.component';
import { RoleDetailComponent } from '../../catalogs/roles/role-detail/role-detail.component';
import { GoalsComponent } from '../../catalogs/goals/goals.component';
import { GoalDetailComponent } from '../../catalogs/goals/goal-detail/goal-detail.component';
import { GoalTypesComponent } from '../../catalogs/goal-types/goal-types.component';
import { GoalTypeDetailComponent } from '../../catalogs/goal-types/goal-type-detail/goal-type-detail.component';

export const LAYOUT_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'users', component: UsersComponent },
    { path: 'user-detail', component: UserDetailComponent },
    { path: 'user-detail/:id', component: UserDetailComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'role-detail', component: RoleDetailComponent },
    { path: 'role-detail/:id', component: RoleDetailComponent },
    { path: 'goals', component: GoalsComponent },
    { path: 'goal-detail', component: GoalDetailComponent },
    { path: 'goal-detail/:id', component: GoalDetailComponent },
    { path: 'goalsType', component: GoalTypesComponent },
    { path: 'goalType-detail', component: GoalTypeDetailComponent },
    { path: 'goalType-detail/:id', component: GoalTypeDetailComponent },
    { path: '**', component: DashboardComponent }
];
