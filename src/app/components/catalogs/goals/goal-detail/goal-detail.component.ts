import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/iuser';
import { IGoalType } from 'src/app/models/igoal-type';
import { IGoal, Goal } from 'src/app/models/igoal';
import { GoalTypesService } from 'src/app/services/goal-types.service';
import { UserService } from 'src/app/services/user.service';
import { GoalService } from 'src/app/services/goal.service';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css']
})
export class GoalDetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions = [];
  id: number;
  isAdd = true;
  goalTypes: IGoalType[];
  users: IUser[];
  goal: IGoal = {
    id: null,
    goalTypeId: null,
    name: null,
    user: null
  };

  // Nav Config
  navConfig = {
    title: "Goal detail",
    showBackButton: true,
    showSaveButton: true
  }

  constructor(private _userService: UserService,
    private _goalTypesService: GoalTypesService,
    private _goalService: GoalService,
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
        .subscribe((goal: IGoal) => {
          this.goal = goal;
          this.form.patchValue(this.goal);
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
    this._goalService.get()
      .subscribe((success: any) => this.goal = success);

    this._userService.get()
      .subscribe((success: any) => this.users = success);

    this._goalTypesService.get()
      .subscribe((success: any) => this.goalTypes = success);
  }

  buildForm() {
    this.form = this._formBuilder.group({
      goalTypeId: [this.goal.goalTypeId, Validators.required],
      name: [this.goal.name, Validators.required],
      user: [this.goal.user, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.goal = new Goal(this.id, this.form.value);
      if (this.isAdd) {
        this._goalService.create(this.goal)
          .subscribe(() => {
            this._router.navigate(['goals']);
            this._alertService.success('Goal successfully added');
          });
      } else {
        this._goalService.update(this.id, this.goal)
          .subscribe(() => {
            this._router.navigate(['goals']);
            this._alertService.success('Goal successfully upgraded');
          });
      }
    } else {
      this._alertService.error('Please check your info');
    }
  }

  get f() { return this.form.controls; }

  back() {
    this._router.navigate(['goals']);
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({});
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
