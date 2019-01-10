import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.emitTitleEvent('Dashboard');
    this._eventService.emitShowSearchEvent(false);
  }

}
