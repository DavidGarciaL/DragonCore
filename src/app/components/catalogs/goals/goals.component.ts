import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { IGoal } from 'src/app/models/igoal';
import { Columns } from 'src/app/config/columns';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit, OnDestroy {
  goals: IGoal[] = [];
  goalsAux: IGoal[] = [];
  columns: any;
  subscriptions: any[] = [];
  pages: any[] = [];
  currentPage: number = 1;
  currentGoalCount: number;
  currentGoals: IGoal[] = [];

  // Nav Config
  navConfig = {
    title: 'Goals',
    showSearch: true
  }

  constructor(private _goalService: GoalService,
              private _eventService: EventService,
              private _router: Router,
              private _alertService: AlertService) { }
  
  ngOnInit() {
    this._eventService.emitLoading(true);
    this._eventService.emitNavConfig(this.navConfig);

    this.getData();
    this.search();
    
    this.columns = Columns.goal;
  }
  
  getData() {
    this._goalService.get()
      .subscribe((data: any) => {
        this.goals = data;
        this.goalsAux = this.goals;
        this.currentGoals = this.goals;
        this.currentGoalCount = this.goals.length;
        this.paging(1);
        this._eventService.emitLoading(false);
      });
  }

  add() {
    this._router.navigate(['goal-detail']);
  }

  edit(id) {
    this._router.navigate(['goal-detail', id]);
  }

  search() {
    this.subscriptions.push(
      this._eventService.getSearchEmitter()
        .subscribe(textSearch => {
          this.goals = this.goalsAux;
          this.goals = this.goals.filter((f) => {
            for (const column of this.columns) {
              if (String(f[column.code]).includes(textSearch)) {
                return f;
              }
            }
          });
          this.currentGoalCount = this.goals.length;
          this.currentGoals = this.goals;
          this.paging(1);
        })
    );
  }

  remove(id) {
    this._goalService.delete(id)
      .subscribe(() => {
        this.getData();
        this._alertService.success('Goal succsessfully deleted');
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
      if (i < this.currentGoalCount) {
        filter.push(this.currentGoals[i]);
      }
    }

      pages = this.residuo(numItems);

    for (let i = 0; i < pages; i++) {
      this.pages.push({pageNumber: (i+1)});
    }

    this.goals = filter;
  }

  residuo(numItems: number): number {
    let pages = this.currentGoalCount/numItems;
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
