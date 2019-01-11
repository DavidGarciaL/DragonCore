import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/iuser';
import { Columns } from 'src/app/config/columns';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  title = 'Users';
  users: IUser[] = [];
  columns: any;
  subscriptions: any[] = [];

  constructor(private _userService: UserService,
              private _eventService: EventService,
              private _router: Router) { }
  
  ngOnInit() {
    this._eventService.emitTitleEvent(this.title);
    this._eventService.emitShowSearchEvent(true);
    this._userService.get()
      .subscribe((data: any) => this.users = data);
    this.columns = Columns.user;
  }

  add() {
    this._router.navigate(['user-detail']);
  }

  edit(id) {
    console.log(id);
  }

  remove(id) {
    console.log(id);
  }
}
