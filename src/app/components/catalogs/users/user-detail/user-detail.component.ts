import { Component, OnInit, OnDestroy } from '@angular/core';
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  subscriptions = [];
  // Nav Config
  navConfig = {
    title: "Agregar usuario",
    showBackButton: true,
    showSaveButton: true
  }

  // Icons
  faUser = faUser;
  faEnvelope = faEnvelope;

  constructor(private _eventService: EventService,
              private _router: Router) { }

  ngOnInit() {
    this._eventService.emitNavConfig(this.navConfig);
    this.subscriptions.push(
      this._eventService.getBackButtonEmitter()
        .subscribe(() => this.back())
    );
  }

  back() {
    this._router.navigate(['users']);
  }

  ngOnDestroy() {
    this._eventService.emitNavConfig({ });
  }

}
