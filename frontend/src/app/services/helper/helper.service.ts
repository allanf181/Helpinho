import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelpRequest, RequestHelper } from '../../models/helper.model';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private URL_API = 'http://localhost:3000/dev/';
  private sufix = 'helper';
  constructor(private httpClient: HttpClient) {}

  getHelpers() {
    return this.httpClient.get<RequestHelper>(this.URL_API + this.sufix);
  }
}
