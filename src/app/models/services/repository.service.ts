import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userprofile } from '../userprofile.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(public httpClient: HttpClient, ) { }

  public apiUrl = '/api/';
saveApplication(profile: Userprofile, url: string) {
  url = this.apiUrl + url;
  this.sendRequest('POST', url, profile);
}
  public sendRequest(method: string, url: string, options?: any) {
  return this.httpClient.request(method, url, options);
}
}
