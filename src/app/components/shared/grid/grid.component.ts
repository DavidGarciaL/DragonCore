import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { faPen, faTrash, faCaretUp, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnDestroy {
  @Input() columns: any;
  @Input() data: any[];
  @Output() addEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
  @Output() removeEmitter = new EventEmitter();
  columnSorted: string = '';
  row: boolean;
  dataAux: any;
  textSearch: string;
  subscriptions: any[] = [];
  flagFilter: boolean = false;

  // Icons
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;
  faSort = faCaretUp;

  constructor(private _eventService: EventService) { }

  ngOnInit() { 
    this.subscriptions.push(
      this._eventService.getSearchEmitter()
        .subscribe(textSearch => {
          ((!this.flagFilter)?this.dataAux=this.data:this.data=this.dataAux);
          this.flagFilter = true;
          this.textSearch = textSearch;
          this.data = this.data.filter((f) => {
            for (const column of this.columns) {
              if (String(f[column.code]).includes(this.textSearch)) {
                return f;
              }
            }
          });
        })
    );
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

  add() {
    this.addEmitter.emit();
  }

  edit(id) {
    this.editEmitter.emit(id);
  }

  remove(id) {
    this.removeEmitter.emit(id);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
