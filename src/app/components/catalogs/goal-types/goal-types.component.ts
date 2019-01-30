import { Component, OnInit } from '@angular/core';
import { IGoalType, GoalType } from 'src/app/models/igoal-type';
import { GoalTypesService } from 'src/app/services/goal-types.service';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Columns } from 'src/app/config/columns';

@Component({
  selector: 'app-goal-types',
  templateUrl: './goal-types.component.html',
  styleUrls: ['./goal-types.component.css']
})
export class GoalTypesComponent implements OnInit {
  goalTypes: IGoalType[] = [];
  goalTypesAux: GoalType[] = [];
  columns: any;
  subscriptions: any[] = [];
  pages: any[] = [];
  currentPage: number = 1;
  currentGoalTypeCount: number;
  currentGoalTypes: IGoalType[] = [];

  // Nav Config
  navConfig = {
    title: 'Goal types',
    showSearch: true
  }

  constructor(private _goalTypesService: GoalTypesService,
    private _eventService: EventService,
    private _router: Router,
    private _alertService: AlertService) { }

  ngOnInit() {
    this._eventService.emitLoading(true);
    this._eventService.emitNavConfig(this.navConfig);

    this.getData();
    this.search();

    this.columns = Columns.user;
  }

  getData() {
    this._goalTypesService.get()
      .subscribe((data: any) => {
        this.goalTypes = data;
        this.goalTypesAux = this.goalTypes;
        this.currentGoalTypes = this.goalTypes;
        this.currentGoalTypeCount = this.goalTypes.length;
        this.paging(1);
        this._eventService.emitLoading(false);
      });
  }

  add() {
    this._router.navigate(['goalType-detail']);
  }

  edit(id) {
    this._router.navigate(['goalType-detail', id]);
  }

  search() {
    this.subscriptions.push(
      this._eventService.getSearchEmitter()
        .subscribe(textSearch => {
          this.goalTypes = this.goalTypesAux;
          this.goalTypes = this.goalTypes.filter((f) => {
            for (const column of this.columns) {
              if (String(f[column.code]).includes(textSearch)) {
                return f;
              }
            }
          });
          this.currentGoalTypeCount = this.goalTypes.length;
          this.currentGoalTypes = this.goalTypes;
          this.paging(1);
        })
    );
  }

  remove(id) {
    this._goalTypesService.delete(id)
      .subscribe(() => {
        this.getData();
        this._alertService.success('Goal type succsessfully deleted');
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
      if (i < this.currentGoalTypeCount) {
        filter.push(this.currentGoalTypes[i]);
      }
    }

    pages = this.residuo(numItems);

    for (let i = 0; i < pages; i++) {
      this.pages.push({ pageNumber: (i + 1) });
    }

    this.goalTypes = filter;
  }

  residuo(numItems: number): number {
    let pages = this.currentGoalTypeCount / numItems;
    let pagesCast = pages.toString();
    let pageSplit = pagesCast.split('.');
    pages = Number(pageSplit[0]);
    if (pagesCast.includes('.')) {
      pages++;
    }
    return pages;
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({});
  }
}
