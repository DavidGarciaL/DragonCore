import { Component, OnInit, OnDestroy } from '@angular/core';
import { IIncentivePlan } from 'src/app/models/iincentive-plan';
import { IncentivePlanService } from 'src/app/services/incentive-plan.service';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Columns } from 'src/app/config/columns';

@Component({
  selector: 'app-incentive-plan',
  templateUrl: './incentive-plan.component.html',
  styleUrls: ['./incentive-plan.component.css']
})
export class IncentivePlanComponent implements OnInit, OnDestroy {
  incentivePlans: IIncentivePlan[] = [];
  incentivePlansAux: IIncentivePlan[] = [];
  columns: any;
  subscriptions: any[] = [];
  pages: any[] = [];
  currentPage: number = 1;
  currentIncentivePlanCount: number;
  currentIncentivePlans: IIncentivePlan[] = [];

  // Nav Config
  navConfig = {
    title: 'Incentive plans',
    showSearch: true
  }

  constructor(private _incentivePlanService: IncentivePlanService,
              private _eventService: EventService,
              private _router: Router,
              private _alertService: AlertService) { }
  
  ngOnInit() {
    this._eventService.emitLoading(true);
    this._eventService.emitNavConfig(this.navConfig);

    this.getData();
    this.search();
    
    this.columns = Columns.incentivePlan;
  }
  
  getData() {
    this._incentivePlanService.get()
      .subscribe((data: any) => {
        this.incentivePlans = data;
        this.incentivePlansAux = this.incentivePlans;
        this.currentIncentivePlans = this.incentivePlans;
        this.currentIncentivePlanCount = this.incentivePlans.length;
        this.paging(1);
        this._eventService.emitLoading(false);
      });
  }

  add() {
    this._router.navigate(['incentivePlan-detail']);
  }

  edit(id) {
    this._router.navigate(['incentivePlan-detail', id]);
  }

  search() {
    this.subscriptions.push(
      this._eventService.getSearchEmitter()
        .subscribe(textSearch => {
          this.incentivePlans = this.incentivePlansAux;
          this.incentivePlans = this.incentivePlans.filter((f) => {
            for (const column of this.columns) {
              if (String(f[column.code]).includes(textSearch)) {
                return f;
              }
            }
          });
          this.currentIncentivePlanCount = this.incentivePlans.length;
          this.currentIncentivePlans = this.incentivePlans;
          this.paging(1);
        })
    );
  }

  remove(id) {
    this._incentivePlanService.delete(id)
      .subscribe(() => {
        this.getData();
        this._alertService.success('Incentive plan succsessfully deleted');
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
      if (i < this.currentIncentivePlanCount) {
        filter.push(this.currentIncentivePlans[i]);
      }
    }

      pages = this.residuo(numItems);

    for (let i = 0; i < pages; i++) {
      this.pages.push({pageNumber: (i+1)});
    }

    this.incentivePlans = filter;
  }

  residuo(numItems: number): number {
    let pages = this.currentIncentivePlanCount/numItems;
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
