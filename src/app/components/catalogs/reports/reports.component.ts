import { Component, OnInit, OnDestroy } from '@angular/core';
import { IReport } from 'src/app/models/ireport';
import { ReportService } from 'src/app/services/report.service';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Columns } from 'src/app/config/columns';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {
  reports: IReport[] = [];
  reportsAux: IReport[] = [];
  columns: any;
  subscriptions: any[] = [];
  pages: any[] = [];
  currentPage: number = 1;
  currentReportCount: number;
  currentReports: IReport[] = [];

  // Nav Config
  navConfig = {
    title: 'Reports',
    showSearch: true
  }

  constructor(private _reportService: ReportService,
              private _eventService: EventService,
              private _router: Router,
              private _alertService: AlertService) { }
  
  ngOnInit() {
    this._eventService.emitLoading(true);
    this._eventService.emitNavConfig(this.navConfig);

    this.getData();
    this.search();
    
    this.columns = Columns.report;
  }
  
  getData() {
    this._reportService.get()
      .subscribe((data: any) => {
        this.reports = data;
        this.reportsAux = this.reports;
        this.currentReports = this.reports;
        this.currentReportCount = this.reports.length;
        this.paging(1);
        this._eventService.emitLoading(false);
      });
  }

  add() {
    this._router.navigate(['report-detail']);
  }

  edit(id) {
    this._router.navigate(['report-detail', id]);
  }

  search() {
    this.subscriptions.push(
      this._eventService.getSearchEmitter()
        .subscribe(textSearch => {
          this.reports = this.reportsAux;
          this.reports = this.reports.filter((f) => {
            for (const column of this.columns) {
              if (String(f[column.code]).includes(textSearch)) {
                return f;
              }
            }
          });
          this.currentReportCount = this.reports.length;
          this.currentReports = this.reports;
          this.paging(1);
        })
    );
  }

  remove(id) {
    this._reportService.delete(id)
      .subscribe(() => {
        this.getData();
        this._alertService.success('Report succsessfully deleted');
      })
  }

  paging(pageNumber) {
    this.currentPage = pageNumber;
    this.pages = [];
    let numItems = 5;
    let page = pageNumber;
    let start = (page * numItems) - numItems;
    let limit = page * numItems;
    let filter: any[] = [];
    let pages: number;

    for (let i = start; i < limit; i++) {
      if (i < this.currentReportCount) {
        filter.push(this.currentReports[i]);
      }
    }

      pages = this.residuo(numItems);

    for (let i = 0; i < pages; i++) {
      this.pages.push({pageNumber: (i+1)});
    }

    this.reports = filter;
  }

  residuo(numItems: number): number {
    let pages = this.currentReportCount/numItems;
    let pagesCast = pages.toString();
    let pageSplit = pagesCast.split('.');
    pages = Number(pageSplit[0]);
    if (pagesCast.includes('.')) {
      pages++;
    }
    return pages;
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({ });
  }
}
