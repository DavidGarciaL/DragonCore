import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public name: string;

  constructor(public _http: HttpClient) { }

  public get() {
    return this._http.get(`${API.URL.PROD}/${this.name}`);
  }
}
