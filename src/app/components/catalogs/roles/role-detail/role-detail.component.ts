import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRole, Role } from 'src/app/models/irole';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions = [];
  id: number;
  isAdd = true;
  role: IRole = {
    id: null,
    name: null
  };

  // Nav Config
  navConfig = {
    title: "Role detail",
    showBackButton: true,
    showSaveButton: true
  }

  constructor(private _roleService: RoleService,
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
    this.buildForm();

    if (!this.isAdd) {
      this._roleService.getById(this.id)
        .subscribe((role: IRole) => {
          this.role = role;
          this.form.patchValue(this.role);
        });
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


  buildForm() {
    this.form = this._formBuilder.group({
      name: [this.role.name, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.role = new Role(this.id, this.form.value);
      if (this.isAdd) {
        this._roleService.create(this.role)
          .subscribe(() => {
            this._router.navigate(['roles']);
            this._alertService.success('Role successfully added');
          });
      } else {
        this._roleService.update(this.id, this.role)
          .subscribe(() => {
            this._router.navigate(['roles']);
            this._alertService.success('Role successfully upgraded');
          });
      }
    } else {
      this._alertService.error('Please check your info');
    }
  }

  get f() { return this.form.controls; }

  back() {
    this._router.navigate(['roles']);
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({});
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
