import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


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
    AlertComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CommonService, UserService, RoleService, TeamService, AlertService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
