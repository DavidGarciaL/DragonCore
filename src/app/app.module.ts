import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { UsersComponent } from './components/catalogs/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GridComponent } from './components/shared/grid/grid.component';

// Services
import { CommonService } from './services/common.service';
import { UserService } from './services/user.service';
import { EventService } from './services/event.service';
import { UserDetailComponent } from './components/catalogs/users/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    UsersComponent,
    DashboardComponent,
    GridComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [CommonService, UserService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
