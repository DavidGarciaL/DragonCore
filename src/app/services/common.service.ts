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

  public getById(id) {
    return this._http.get(`${API.URL.PROD}/${this.name}/${id}`)
  }

  public create(data) {
    return this._http.post(`${API.URL.PROD}/${this.name}`, data);
  }

  public update(id, data) {
    return this._http.put(`${API.URL.PROD}/${this.name}/${id}`, data);
  }

  public delete(id) {
    return this._http.delete(`${API.URL.PROD}/${this.name}/${id}`);
  }
}
