import { EventEmitter } from "@angular/core";


export class EventService {
  title: EventEmitter<string> = new EventEmitter();
  showSearch: EventEmitter<boolean> = new EventEmitter();
  search: EventEmitter<string> = new EventEmitter();
  showBackButton: EventEmitter<boolean> = new EventEmitter();
  backButton: EventEmitter<any> = new EventEmitter();
  showSaveButton: EventEmitter<boolean> = new EventEmitter();
  saveButton: EventEmitter<any> = new EventEmitter();
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

  emitShowBackButtonEvent(show) {
    this.showBackButton.emit(show);
  }

  emitBackButtonEvent() {
    this.backButton.emit();
  }

  emitShowSaveButtonEvent(show) {
    this.showSaveButton.emit(show);
  }

  emitSaveButtonEvent() {
    this.saveButton.emit();
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

  getShowBackButtonEmitter() {
    return this.showBackButton;
  }

  getBackButtonEmitter () {
    return this.backButton;
  }

  getShowSaveButtonEmitter() {
    return this.showSaveButton;
  }

  getSaveButtonEmitter() {
    return this.saveButton;
  }
}