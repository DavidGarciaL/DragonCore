import { EventEmitter } from "@angular/core";


export class EventService {
  title: EventEmitter<string> = new EventEmitter();
  showSearch: EventEmitter<boolean> = new EventEmitter();
  search: EventEmitter<string> = new EventEmitter();
  constructor() {}

  emitTitleEvent(title) {
    this.title.emit(title);
  }

  emitShowSearchEvent(showSearch) {
    this.showSearch.emit(showSearch);
  }

  emitSearchEvent(search) {
    this.search.emit(search);
  }

  getTitleEmitter() {
    return this.title;
  }

  getShowSearchEmitter() {
    return this.showSearch;
  }

  getSearchEmitter() {
    return this.search;
  }
}