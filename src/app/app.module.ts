import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';



// Components
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { UsersComponent } from './components/catalogs/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GridComponent } from './components/shared/grid/grid.component';
import { UserDetailComponent } from './components/catalogs/users/user-detail/user-detail.component';
import { AlertComponent } from './components/shared/alert/alert.component';

// Services
import { CommonService } from './services/common.service';
import { UserService } from './services/user.service';
import { EventService } from './services/event.service';
import { RoleService } from './services/role.service';
import { TeamService } from './services/team.service';
import { AlertService } from './services/alert.service';
import { RolesComponent } from './components/catalogs/roles/roles.component';
import { RoleDetailComponent } from './components/catalogs/roles/role-detail/role-detail.component';
import { GoalsComponent } from './components/catalogs/goals/goals.component';
import { GoalDetailComponent } from './components/catalogs/goals/goal-detail/goal-detail.component';
import { GoalTypesComponent } from './components/catalogs/goal-types/goal-types.component';
import { GoalTypeDetailComponent } from './components/catalogs/goal-types/goal-type-detail/goal-type-detail.component';
import { GoalTypesService } from './services/goal-types.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    UsersComponent,
    DashboardComponent,
    GridComponent,
    UserDetailComponent,
    AlertComponent,
    RolesComponent,
    RoleDetailComponent,
    GoalsComponent,
    GoalDetailComponent,
    GoalTypesComponent,
    GoalTypeDetailComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule
  ],
  providers: [CommonService, UserService, RoleService, TeamService, GoalTypesService, AlertService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
