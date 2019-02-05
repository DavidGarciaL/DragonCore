import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Nav Config
  navConfig = {
    title: 'Global Dashboard',
    showSearch: true,
    dashboard: true
  }

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.emitNavConfig(this.navConfig);
  }

}
