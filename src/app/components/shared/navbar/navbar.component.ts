import { Component, OnInit, Output, EventEmitter, HostListener, OnChanges, Input, OnDestroy } from '@angular/core';
import { faAlignJustify, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() changeActive = new EventEmitter();
  active: boolean = false;
  subscriptions: any[] = [];
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth <= 768) {
      this.active = !this.active;
      this.changeActive.emit(this.active);  
    }
  }
  
  // Config
  navConfig = {
    title: '',
    showSearch: false,
    showBackButton: false,
    showSaveButton: false    
  }

  // Icons
  faAlignJustify = faAlignJustify;
  faArrowLeft = faArrowLeft;

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this.subscriptions.push(
      this._eventService.getNavConfig()
        .subscribe(navConfig => this.navConfig = navConfig)
    );
  }
  
  change() {
    this.active = !this.active;
    this.changeActive.emit(this.active);
  }
  
  search(text) {
    this._eventService.emitSearchEvent(text.value);
  }

  back() {
    this._eventService.emitBackButtonEvent();
  }

  save() {
    this._eventService.emitSaveButtonEvent();
  }
  
    ngOnDestroy() {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      })
    }
}
