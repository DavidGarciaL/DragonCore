import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  title = "Agregar usuario";
  

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.emitTitleEvent(this.title);
    this._eventService.emitShowBackButtonEvent(true);
    this._eventService.emitShowSaveButtonEvent(true);
  }

  ngOnDestroy() {
    this._eventService.emitShowBackButtonEvent(false);
    this._eventService.emitShowSaveButtonEvent(false);
  }

}
