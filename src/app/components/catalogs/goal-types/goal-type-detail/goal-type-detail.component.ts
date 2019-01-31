import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IGoalType, GoalType } from 'src/app/models/igoal-type';
import { GoalTypesService } from 'src/app/services/goal-types.service';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-goal-type-detail',
  templateUrl: './goal-type-detail.component.html',
  styleUrls: ['./goal-type-detail.component.css']
})
export class GoalTypeDetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions = [];
  id: number;
  isAdd = true;
  goalType: IGoalType = {
    id: null,
    name: null,
    defaultTarget: null,
    agregation: null,
    condition: false,
    fieldCondition: null,
    valueCondition: null
  };

  // Nav Config
  navConfig = {
    title: "Goal type detail",
    showBackButton: true,
    showSaveButton: true
  }


  constructor(private _goalTypesService: GoalTypesService,
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
      this._goalTypesService.getById(this.id)
        .subscribe((goalType: IGoalType) => {
          this.goalType = goalType;
          this.form.patchValue(this.goalType);
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

  buildForm() {
    this.form = this._formBuilder.group({
      name: [this.goalType.name, Validators.required],
      defaultTarget: [this.goalType.defaultTarget, Validators.required],
      agregation: [this.goalType.agregation, Validators.required],
      condition: [this.goalType.condition],
      fieldCondition: [this.goalType.fieldCondition],
      valueCondition: [this.goalType.valueCondition]
    });
  }

  clickCondition() {
    if (!this.f.condition.value) {
      this.f.fieldCondition.setValidators(Validators.required);
      this.f.fieldCondition.updateValueAndValidity();
      this.f.valueCondition.setValidators(Validators.required);
      this.f.valueCondition.updateValueAndValidity();
    } else {
      this.f.fieldCondition.clearValidators();
      this.f.fieldCondition.reset();
      this.f.valueCondition.clearValidators();
      this.f.valueCondition.reset();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.goalType = new GoalType(this.id, this.form.value);
      if (this.isAdd) {
        this._goalTypesService.create(this.goalType)
          .subscribe(() => {
            this._router.navigate(['goalTypes']);
            this._alertService.success('Goal type successfully added');
          });
      } else {
        this._goalTypesService.update(this.id, this.goalType)
          .subscribe(() => {
            this._router.navigate(['goalTypes']);
            this._alertService.success('Goal type successfully upgraded');
          });
      }
    } else {
      this._alertService.error('Please check your info');
    }
  }

  get f() { return this.form.controls; }

  back() {
    this._router.navigate(['goalTypes']);
  }

  ngOnDestroy(): void {
    this._eventService.emitNavConfig({});
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
