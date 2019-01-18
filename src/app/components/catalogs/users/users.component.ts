import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/iuser';
import { Columns } from 'src/app/config/columns';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  title = 'Users';
  users: IUser[] = [];
  usersAux: IUser[] = [];
  columns: any;
  subscriptions: any[] = [];
  pages: any[] = [];
  currentPage: number = 1;
  currentUserCount: number;
  currentUsers: IUser[] = [];

  // Nav Config
  navConfig = {
    title: 'Users',
    showSearch: true
  }

  constructor(private _userService: UserService,
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
    this._userService.get()
      .subscribe((data: any) => {
        this.users = data;
        this.usersAux = this.users;
        this.currentUsers = this.users;
        this.currentUserCount = this.users.length;
        this.paging(1);
        this._eventService.emitLoading(false);
      });
  }

  add() {
    this._router.navigate(['user-detail']);
  }

  edit(id) {
    this._router.navigate(['user-detail', id]);
  }

  search() {
    this.subscriptions.push(
      this._eventService.getSearchEmitter()
        .subscribe(textSearch => {
          this.users = this.usersAux;
          this.users = this.users.filter((f) => {
            for (const column of this.columns) {
              if (String(f[column.code]).includes(textSearch)) {
                return f;
              }
            }
          });
          this.currentUserCount = this.users.length;
          this.currentUsers = this.users;
          this.paging(1);
        })
    );
  }

  remove(id) {
    this._userService.delete(id)
      .subscribe(() => {
        this.getData();
        this._alertService.success('User succsessfully deleted');
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
      if (i < this.currentUserCount) {
        filter.push(this.currentUsers[i]);
      }
    }

      pages = this.residuo(numItems);

    for (let i = 0; i < pages; i++) {
      this.pages.push({pageNumber: (i+1)});
    }

    this.users = filter;
  }

  residuo(numItems: number): number {
    let pages = this.currentUserCount/numItems;
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