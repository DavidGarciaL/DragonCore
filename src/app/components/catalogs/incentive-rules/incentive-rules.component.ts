import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncentiveRuleService } from 'src/app/services/incentive-rule.service';
import { IIncentiveRule } from 'src/app/models/iincentive-rule';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Columns } from 'src/app/config/columns';

@Component({
  selector: 'app-incentive-rules',
  templateUrl: './incentive-rules.component.html',
  styleUrls: ['./incentive-rules.component.css']
})
export class IncentiveRulesComponent implements OnInit, OnDestroy {
  incentiveRules: IIncentiveRule[] = [];
  incentiveRulesAux: IIncentiveRule[] = [];
  columns: any;
  subscriptions: any[] = [];
  pages: any[] = [];
  currentPage: number = 1;
  currentIncentiveRuleCount: number;
  currentIncentiveRules: IIncentiveRule[] = [];

  // Nav Config
  navConfig = {
    title: 'Incentive rules',
    showSearch: true
  }

  constructor(private _incentiveRuleService: IncentiveRuleService,
              private _eventService: EventService,
              private _router: Router,
              private _alertService: AlertService) { }
  
  ngOnInit() {
    this._eventService.emitLoading(true);
    this._eventService.emitNavConfig(this.navConfig);

    this.getData();
    this.search();
    
    this.columns = Columns.incentiveRule;
  }
  
  getData() {
    this._incentiveRuleService.get()
      .subscribe((data: any) => {
        this.incentiveRules = data;
        this.incentiveRulesAux = this.incentiveRules;
        this.currentIncentiveRules = this.incentiveRules;
        this.currentIncentiveRuleCount = this.incentiveRules.length;
        this.paging(1);
        this._eventService.emitLoading(false);
      });
  }

  add() {
    this._router.navigate(['incentiveRule-detail']);
  }

  edit(id) {
    this._router.navigate(['incentiveRule-detail', id]);
  }

  search() {
    this.subscriptions.push(
      this._eventService.getSearchEmitter()
        .subscribe(textSearch => {
          this.incentiveRules = this.incentiveRulesAux;
          this.incentiveRules = this.incentiveRules.filter((f) => {
            for (const column of this.columns) {
              if (String(f[column.code]).includes(textSearch)) {
                return f;
              }
            }
          });
          this.currentIncentiveRuleCount = this.incentiveRules.length;
          this.currentIncentiveRules = this.incentiveRules;
          this.paging(1);
        })
    );
  }

  remove(id) {
    this._incentiveRuleService.delete(id)
      .subscribe(() => {
        this.getData();
        this._alertService.success('Incentive rule succsessfully deleted');
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
      if (i < this.currentIncentiveRuleCount) {
        filter.push(this.currentIncentiveRules[i]);
      }
    }

      pages = this.residuo(numItems);

    for (let i = 0; i < pages; i++) {
      this.pages.push({pageNumber: (i+1)});
    }

    this.incentiveRules = filter;
  }

  residuo(numItems: number): number {
    let pages = this.currentIncentiveRuleCount/numItems;
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
