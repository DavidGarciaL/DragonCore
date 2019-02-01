import { Component, OnInit } from '@angular/core';
import { ITeam } from 'src/app/models/iteam';
import { TeamService } from 'src/app/services/team.service';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Columns } from 'src/app/config/columns';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: ITeam[] = [];
  teamsAux: ITeam[] = [];
  columns: any;
  subscriptions: any[] = [];
  pages: any[] = [];
  currentPage: number = 1;
  currentTeamCount: number;
  currentTeams: ITeam[] = [];

  // Nav Config
  navConfig = {
    title: 'Teams',
    showSearch: true
  }

  constructor(private _teamService: TeamService,
              private _eventService: EventService,
              private _router: Router,
              private _alertService: AlertService) { }
  
  ngOnInit() {
    this._eventService.emitLoading(true);
    this._eventService.emitNavConfig(this.navConfig);

    this.getData();
    this.search();
    
    this.columns = Columns.team;
  }
  
  getData() {
    this._teamService.get()
      .subscribe((data: any) => {
        this.teams = data;
        this.teamsAux = this.teams;
        this.currentTeams = this.teams;
        this.currentTeamCount = this.teams.length;
        this.paging(1);
        this._eventService.emitLoading(false);
      });
  }

  add() {
    this._router.navigate(['team-detail']);
  }

  edit(id) {
    this._router.navigate(['team-detail', id]);
  }

  search() {
    this.subscriptions.push(
      this._eventService.getSearchEmitter()
        .subscribe(textSearch => {
          this.teams = this.teamsAux;
          this.teams = this.teams.filter((f) => {
            for (const column of this.columns) {
              if (String(f[column.code]).includes(textSearch)) {
                return f;
              }
            }
          });
          this.currentTeamCount = this.teams.length;
          this.currentTeams = this.teams;
          this.paging(1);
        })
    );
  }

  remove(id) {
    this._teamService.delete(id)
      .subscribe(() => {
        this.getData();
        this._alertService.success('Team succsessfully deleted');
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
      if (i < this.currentTeamCount) {
        filter.push(this.currentTeams[i]);
      }
    }

      pages = this.residuo(numItems);

    for (let i = 0; i < pages; i++) {
      this.pages.push({pageNumber: (i+1)});
    }

    this.teams = filter;
  }

  residuo(numItems: number): number {
    let pages = this.currentTeamCount/numItems;
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
