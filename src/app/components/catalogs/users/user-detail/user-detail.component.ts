import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IUser, User } from 'src/app/models/iuser';
import { RoleService } from 'src/app/services/role.service';
import { IRole } from 'src/app/models/irole';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { ITeam } from 'src/app/models/iteam';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions = [];
  id: number;
  isAdd = true;
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
    title: "User detail",
    showBackButton: true,
    showSaveButton: true
  }

  constructor(private _userService: UserService,
    private _roleService: RoleService,
    private _teamService: TeamService,
    private _eventService: EventService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _alertService: AlertService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id != null) 
        this.isAdd = false;
    });
    
    this.configuration();
    this.getDataForSelectBox();
    this.buildForm();
    
    if (!this.isAdd) {
      this._userService.getById(this.id)
      .subscribe((user: IUser) => {
          this.user = user;
          this.form.patchValue(this.user);
          this.form.controls.employmentDate.setValue(new Date(this.user.employmentDate).toISOString().substring(0, 10));
          this.form.controls.confirmPassword.setValue(this.user.password);
        })
    }
  }

  configuration() {
    document.getElementById("first").focus();

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
  }

  getDataForSelectBox() {
    this._userService.get()
      .subscribe((success: any) => this.managers = success);

    this._roleService.get()
      .subscribe((success: any) => this.roles = success);

    this._teamService.get()
      .subscribe((success: any) => this.teams = success);
  }

  buildForm() {
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
      confirmPassword: [this.user.password],
      sendEmails: [this.user.sendEmails],
    });

    this.f.confirmPassword.setValidators([Validators.required, this.confirmpasswordMatch.bind(this.form)]);
  }

  onSubmit() {
    if (this.form.valid) {
      this.user = new User(this.id, this.form.value);
      if (this.isAdd) {
        this._userService.create(this.user)
          .subscribe(() => {
            this._router.navigate(['users']);
            this._alertService.success('User successfully added');
          });
      } else {
        this._userService.update(this.id, this.user)
          .subscribe(() => {
            this._router.navigate(['users']);
            this._alertService.success('User successfully upgraded');
          });
      }
    } else {
      this._alertService.error('Please check your info');
    }
  }

  passwordMatch(control: FormGroup): { [s: string]: boolean } {
    let form: any = this;

    if (control.value != form.controls.confirmPassword.value) {
      return {
        passwordMatch: false
      }
    }

    return null;
  }

  confirmpasswordMatch(control: FormGroup): { [s: string]: boolean } {
    let form: any = this;

    if (control.value != form.controls.password.value) {
      return {
        passwordMatch: false
      }
    }

    return null;
  }

  get f() { return this.form.controls; }

  back() {
    this._router.navigate(['users']);
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({});
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
