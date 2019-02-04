import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IncentivePlanService extends CommonService {

  constructor(_http: HttpClient) { 
    super(_http);
    this.name = 'IncentivePlans';
  }
}
