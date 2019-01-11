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
  title: string;
  showSearch: boolean = false;
  showBackButton: boolean = false;
  showSaveButton: boolean = false;
  active: boolean = false;
  subscriptions: any[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth <= 768) {
      this.active = !this.active;
      this.changeActive.emit(this.active);  
    }
  }

  // Icons
  faAlignJustify = faAlignJustify;
  faArrowLeft = faArrowLeft;

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this.subscriptions.push(
      this._eventService.getTitleEmitter()
        .subscribe(data => this.title = data)
    );

    this.subscriptions.push(
      this._eventService.getShowSearchEmitter()
        .subscribe(data => this.showSearch = data)
    );

    this.subscriptions.push(
      this._eventService.getShowBackButtonEmitter()
        .subscribe(data => this.showBackButton = data)
    );

    this.subscriptions.push(
      this._eventService.getShowSaveButtonEmitter()
        .subscribe(data => this.showSaveButton = data)
    );
  }
  
  change() {
    this.active = !this.active;
    this.changeActive.emit(this.active);
  }
  
  search(text) {
    this._eventService.emitSearchEvent(text.value);
  }
  
    ngOnDestroy() {
      this.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      })
    }
}
