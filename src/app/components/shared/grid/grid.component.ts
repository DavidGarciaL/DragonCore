import { Component, OnInit, Input } from '@angular/core';
import { faPen, faTrash, faCaretUp, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() columns: any;
  @Input() data: any;
  columnSorted: string = '';
  row: boolean;
  dataTest: any;
  textSearch: string;

  // Icons
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;
  faSort: any;

  constructor(private _eventService: EventService) { }

  ngOnInit() { 
    this._eventService.getSearchEmitter()
      .subscribe(text => this.textSearch = text);
  }

  sortEvent(column: string) {
    if (this.columnSorted != column) {
      this.columnSorted = column;
      this.row = true;
      this.sort();
      this.faSort = faCaretUp;
    } else {
      if (this.row) {
        this.row = !this.row;
        this.sort();
        this.faSort = faCaretDown;
      } else {
        this.row = !this.row;
        this.sort();
        this.faSort = faCaretUp;
      }
    }
  }

  sort() {
    if (this.row) {
      this.data.sort((a,b) => (a[this.columnSorted] > b[this.columnSorted]) ? 1 : ((b[this.columnSorted] > a[this.columnSorted]) ? -1 : 0));
    } else {
      this.data.sort((a,b) => (a[this.columnSorted] < b[this.columnSorted]) ? 1 : ((b[this.columnSorted] < a[this.columnSorted]) ? -1 : 0));
    }
  }

  edit(id) {

  }
}
