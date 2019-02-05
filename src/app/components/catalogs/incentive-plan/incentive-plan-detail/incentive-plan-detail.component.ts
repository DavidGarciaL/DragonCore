import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IIncentivePlan, IncentivePlan } from 'src/app/models/iincentive-plan';
import { IncentivePlanService } from 'src/app/services/incentive-plan.service';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-incentive-plan-detail',
  templateUrl: './incentive-plan-detail.component.html',
  styleUrls: ['./incentive-plan-detail.component.css']
})
export class IncentivePlanDetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions = [];
  id: number;
  isAdd = true;
  incentivePlan: IIncentivePlan = {
    id: null,
    name: null,
    startDate: null,
    endDate: null,
    byUser: false,
    byRole: false,
    byTeam: false,
    destination: null
  };

  // Nav Config
  navConfig = {
    title: "Incentive plan detail",
    showBackButton: true,
    showSaveButton: true
  }

  constructor(private _incentivePlanService: IncentivePlanService,
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
      this._incentivePlanService.getById(this.id)
      .subscribe((incentivePlan: any) => {
          this.incentivePlan = incentivePlan;
          this.form.patchValue(this.incentivePlan);
          this.f.startDate.setValue(new Date(this.incentivePlan.startDate).toISOString().substring(0, 10));
          this.f.endDate.setValue(new Date(this.incentivePlan.endDate).toISOString().substring(0, 10));
          this.onLoad(this.incentivePlan.byUser, this.incentivePlan.byRole, this.incentivePlan.byTeam);
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
      name: [this.incentivePlan.name, Validators.required],
      startDate: [this.incentivePlan.startDate, Validators.required],
      endDate: [this.incentivePlan.endDate, Validators.required],
      by: [null, Validators.required],
      destination: [this.incentivePlan.destination, Validators.required]
    });
  }

  onLoad(byUser: boolean, byRole: boolean, byTeam: boolean) {
    if (byUser) {
      this.f.by.setValue(1);
    } else if (byRole) {
      this.f.by.setValue(2);
    } else if (byTeam) {
      this.f.by.setValue(3);
    }
  }

    onChange(e: number) {
      switch (Number(e)) {
        case 1:
          this.incentivePlan.byUser = true;
          this.incentivePlan.byRole = false;
          this.incentivePlan.byTeam = false;
          break;
        case 2:
          this.incentivePlan.byUser = false;
          this.incentivePlan.byRole = true;
          this.incentivePlan.byTeam = false;
          break;
        case 3:
          this.incentivePlan.byUser = false;
          this.incentivePlan.byRole = false;
          this.incentivePlan.byTeam = true;
          break;
        default:
          break;
      }
    }

  onSubmit() {
    if (this.form.valid) {
      this.incentivePlan = new IncentivePlan(this.id, this.form.value);
      if (this.isAdd) {
        this._incentivePlanService.create(this.incentivePlan)
          .subscribe(() => {
            this._router.navigate(['incentivePlans']);
            this._alertService.success('Incentive plan successfully added');
          });
      } else {
        this._incentivePlanService.update(this.id, this.incentivePlan)
          .subscribe(() => {
            this._router.navigate(['incentivePlans']);
            this._alertService.success('Incentive plan successfully upgraded');
          });
      }
    } else {
      this._alertService.error('Please check your info');
    }
  }

  get f() { return this.form.controls; }

  back() {
    this._router.navigate(['incentivePlans']);
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({});
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
