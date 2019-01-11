import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  title = "Agregar usuario"

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.emitTitleEvent(this.title);
  }

}
