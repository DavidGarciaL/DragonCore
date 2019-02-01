import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IReport, Report } from 'src/app/models/ireport';
import { ReportService } from 'src/app/services/report.service';
import { EventService } from 'src/app/services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  form: FormGroup;
  subscriptions = [];
  id: number;
  isAdd = true;
  report: IReport = {
    id: null,
    schemas: null,
    fields: null,
    filters: null
  };

  // Nav Config
  navConfig = {
    title: "Report detail",
    showBackButton: true,
    showSaveButton: true
  }

  constructor(private _reportService: ReportService,
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
      this._reportService.getById(this.id)
        .subscribe((report: IReport) => {
          this.report = report;
          this.form.patchValue(this.report);
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
      schemas: [this.report.schemas, Validators.required],
      fields: [this.report.fields, Validators.required],
      filters: [this.report.filters, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.report = new Report(this.id, this.form.value);
      if (this.isAdd) {
        this._reportService.create(this.report)
          .subscribe(() => {
            this._router.navigate(['reports']);
            this._alertService.success('Report successfully added');
          });
      } else {
        this._reportService.update(this.id, this.report)
          .subscribe(() => {
            this._router.navigate(['reports']);
            this._alertService.success('Report successfully upgraded');
          });
      }
    } else {
      this._alertService.error('Please check your info');
    }
  }

  get f() { return this.form.controls; }

  back() {
    this._router.navigate(['reports']);
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({});
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
