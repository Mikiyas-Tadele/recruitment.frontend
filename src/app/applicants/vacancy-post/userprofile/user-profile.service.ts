import { Inject, Injectable } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { RepositoryService } from 'src/app/models/services/repository.service';
import { Userprofile } from 'src/app/models/userprofile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

   private readonly ADD_CREATE_APPLICANT = '/application/applicant';
   private readonly GET_APPLICANT = '/application/applicant/';
   private readonly APPLY = '/application/apply';
   private readonly STORE = '/application/store?fileTypeId=';
   private readonly GET_APPLIED_JOBS = '/application/applied-jobs';
   private readonly GET_LOOKUPS = '/settings/getlookupDetails/';

  constructor(private repoService: RepositoryService, @Inject('BASE_API_URL') private baseUrl: string) { }

  saveApplicant(data: Userprofile) {
     const options = {body: data};
     return this.repoService.sendRequest('POST', this.baseUrl + this.ADD_CREATE_APPLICANT, options);
  }

  getApplicant() {
    return this.repoService.sendRequest('GET', this.baseUrl + this.GET_APPLICANT);
  }

  apply(data: Application) {
    const options = {body: data};
    return this.repoService.sendRequest('POST', this.baseUrl + this.APPLY, options);
  }

  storeFile(file: any, fileType: number) {
    return this.repoService.httpClient.post(this.baseUrl + this.STORE + fileType, file);
 }
  getAppliedJobs() {
    return this.repoService.sendRequest('GET', this.baseUrl + this.GET_APPLIED_JOBS);
  }

  getLookkups(code: string) {
    return this.repoService.sendRequest('GET', this.baseUrl + this.GET_LOOKUPS + code);
  }
}
