import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../application.model';
import { Userprofile } from '../userprofile.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(public httpClient: HttpClient, ) { }

  public apiUrl = '/api/';
  url: string;
saveApplication(profile: Userprofile, url: string) {
  url = this.apiUrl + url;
  this.sendRequest('POST', url, profile);
}
applyJob(application: Application) {
  this.url = this.apiUrl + "/";
  this.sendRequest('POST', this.url, application);
}
  public sendRequest(method: string, url: string, options?: any) {
  return this.httpClient.request(method, url, options);
}
}
