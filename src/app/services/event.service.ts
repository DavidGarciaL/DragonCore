import { EventEmitter } from "@angular/core";


export class EventService {
  navConfig: EventEmitter<Object> = new EventEmitter();
  search: EventEmitter<string> = new EventEmitter();
  backButton: EventEmitter<any> = new EventEmitter();
  saveButton: EventEmitter<any> = new EventEmitter();
  loading: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  // Nav Config
  emitNavConfig(navConfig) {
    this.navConfig.emit(navConfig);
  }

  getNavConfig() {
    return this.navConfig;
  }

  // Search
  emitSearchEvent(search) {
    this.search.emit(search);
  }

  getSearchEmitter() {
    return this.search;
  }

  // Back button
  emitBackButtonEvent() {
    this.backButton.emit();
  }

  getBackButtonEmitter () {
    return this.backButton;
  }

  // Save button
  emitSaveButtonEvent() {
    this.saveButton.emit();
  }

  getSaveButtonEmitter() {
    return this.saveButton;
  }

  emitLoading(load) {
    this.loading.emit(load);
  }

  getLoading() {
    return this.loading;
  }
}