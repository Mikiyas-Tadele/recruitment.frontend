import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../application.model';
import { Userprofile } from '../userprofile.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(public httpClient: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  url: string;
saveApplication(profile: Userprofile, url: string) {
  url = this.baseUrl + url;
  this.sendRequest('POST', url, profile);
}
applyJob(application: Application) {
  this.url = this.baseUrl + "/application/applicant";
  this.sendRequest('POST', this.url, application);
}

getUserProfile(): Observable<Userprofile> {
  this.url = this.baseUrl + "/application/applicant";
  return this.sendRequest("GET", this.url, {});
}

  public sendRequest(method: string, url: string, options?: any) : Observable<any> {
  return this.httpClient.request(method, url, options);
}
}
