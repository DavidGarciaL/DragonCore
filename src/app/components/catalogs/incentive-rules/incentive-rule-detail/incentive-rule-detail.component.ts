import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IIncentiveRule, IncentiveRule } from 'src/app/models/iincentive-rule';
import { IIncentivePlan } from 'src/app/models/iincentive-plan';
import { IncentiveRuleService } from 'src/app/services/incentive-rule.service';
import { IncentivePlanService } from 'src/app/services/incentive-plan.service';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-incentive-rule-detail',
  templateUrl: './incentive-rule-detail.component.html',
  styleUrls: ['./incentive-rule-detail.component.css']
})
export class IncentiveRuleDetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions = [];
  id: number;
  isAdd = true;
  incentivePlans: IIncentivePlan[];
  incentiveRule: IIncentiveRule = {
    id: null,
    name: null,
    condition: null,
    incentivePlanId: null
  };

  // Nav Config
  navConfig = {
    title: "Incentive rule detail",
    showBackButton: true,
    showSaveButton: true
  }

  constructor(private _incentiveRuleService: IncentiveRuleService,
    private _incentivePlanService: IncentivePlanService,
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
      this._incentiveRuleService.getById(this.id)
      .subscribe((incentiveRule: IIncentiveRule) => {
          this.incentiveRule = incentiveRule;
          this.form.patchValue(this.incentiveRule);
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
    this._incentivePlanService.get()
      .subscribe((success: any) => this.incentivePlans = success);
  }

  buildForm() {
    this.form = this._formBuilder.group({
      name: [this.incentiveRule.name, Validators.required],
      condition: [this.incentiveRule.condition, Validators.required],
      incentivePlanId: [this.incentiveRule.incentivePlanId, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.incentiveRule = new IncentiveRule(this.id, this.form.value);
      if (this.isAdd) {
        this._incentiveRuleService.create(this.incentiveRule)
          .subscribe(() => {
            this._router.navigate(['incentiveRules']);
            this._alertService.success('Incentive rule successfully added');
          });
      } else {
        this._incentiveRuleService.update(this.id, this.incentiveRule)
          .subscribe(() => {
            this._router.navigate(['incentiveRules']);
            this._alertService.success('Incentive rules successfully upgraded');
          });
      }
    } else {
      this._alertService.error('Please check your info');
    }
  }

  get f() { return this.form.controls; }

  back() {
    this._router.navigate(['incentiveRules']);
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({});
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
