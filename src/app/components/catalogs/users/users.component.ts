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
  columns: any;
  subscriptions: any[] = [];

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
    
    this.columns = Columns.user;
  }
  
  getData() {
    this._userService.get()
      .subscribe((data: any) => {
        this.users = data;
        let numItems = 2;
            let page = 3;
            let start = (page * numItems) - numItems;
            let limit = page * numItems;
            let flag: any[] = [];
            for (let i = start; i < limit; i++) {
              flag.push(this.users[i]);
            }
            this.users = flag;
        this._eventService.emitLoading(false);
      });
  }

  add() {
    this._router.navigate(['user-detail']);
  }

  edit(id) {
    this._router.navigate(['user-detail', id]);
  }

  remove(id) {
    this._userService.delete(id)
      .subscribe(() => {
        this.getData();
        this._alertService.success('User succsessfully deleted');
      })
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({ });
  }
}