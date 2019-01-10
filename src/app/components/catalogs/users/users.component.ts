import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/iuser';
import { Columns } from 'src/app/config/columns';
import { EventService } from 'src/app/services/event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  columns: any;

  constructor(private _userService: UserService,
              private _eventService: EventService) { }
  
  ngOnInit() {
    this._eventService.emitTitleEvent('Users');
    this._eventService.emitShowSearchEvent(true);
    this._userService.get()
      .subscribe((data: any) => this.users = data);
    this.columns = Columns.user;
  }
}
