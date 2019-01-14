import { Component, OnInit, OnDestroy } from '@angular/core';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/iuser';
import { RoleService } from 'src/app/services/role.service';
import { IRole } from 'src/app/models/irole';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { ITeam } from 'src/app/models/iteam';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions = [];
  roles: IRole[];
  managers: IUser[];
  teams: ITeam[];
  user: IUser = {
    name: null,
    id: null,
    lastName: null,
    role: null,
    email: null,
    phone: null,
    manager: null,
    employmentDate: null,
    sendEmails: false,
    team: null,
    password: null
  };

  // Nav Config
  navConfig = {
    title: "Agregar usuario",
    showBackButton: true,
    showSaveButton: true
  }

  // Icons
  faUser = faUser;
  faEnvelope = faEnvelope;

  constructor(private _userService: UserService,
              private _roleService: RoleService,
              private _teamService: TeamService,
              private _eventService: EventService,
              private _router: Router,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      name: [this.user.name, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.required],
      role: [this.user.role, Validators.required],
      manager: [this.user.manager, Validators.required],
      team: [this.user.team, Validators.required],
      employmentDate: [this.user.employmentDate, Validators.required],
      password: [this.user.password, Validators.required],
      confirmPassword: ['', Validators.required],
      sendEmails: [this.user.sendEmails],
    })

    this._eventService.emitNavConfig(this.navConfig);
    this.subscriptions.push(
      this._eventService.getBackButtonEmitter()
        .subscribe(() => this.back())
    );

    this.subscriptions.push(
      this._eventService.getSaveButtonEmitter()
        .subscribe(() => {
          this.onSubmit();
        })
    );

    this._userService.get()
      .subscribe((success: any) => this.managers = success);

    this._roleService.get()
      .subscribe((success: any) => this.roles = success);

    this._teamService.get()
      .subscribe((success: any) => this.teams = success);

    document.getElementById("first").focus();
  }

  back() {
    this._router.navigate(['users']);
  }

  onSubmit() {
    this.user = this.form.value;
    console.log(this.form);
    console.log(this.user);
    if (this.form.valid) {
      console.log("Form valido");
    } else {
      console.log("Form invalido");
    }
  }

  get f() { return this.form.controls; }

  ngOnDestroy() {
    this._eventService.emitNavConfig({ });
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
