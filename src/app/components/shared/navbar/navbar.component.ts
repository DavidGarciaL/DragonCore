import { Component, OnInit, Output, EventEmitter, HostListener, OnChanges, Input, OnDestroy } from '@angular/core';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
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
  active: boolean = false;
  subscription: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth <= 768) {
      this.active = !this.active;
      this.changeActive.emit(this.active);  
    }
  }

  // Icons
  faAlignJustify = faAlignJustify;

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this.subscription = this._eventService.getTitleEmitter()
      .subscribe(data => this.title = data);

    this._eventService.getShowSearchEmitter()
      .subscribe(data => this.showSearch = data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  change() {
    this.active = !this.active;
    this.changeActive.emit(this.active);
  }

  search(text) {
    this._eventService.emitSearchEvent(text.value);
  }

}
