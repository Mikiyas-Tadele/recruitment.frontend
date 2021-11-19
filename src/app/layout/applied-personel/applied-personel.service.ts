import { Inject, Injectable } from '@angular/core';
import { AppliedPersonelFilter } from 'src/app/models/applied-personel-filter.model';
import { saveFile } from 'src/app/models/services/file.saver.helper';
import { RepositoryService } from 'src/app/models/services/repository.service';

@Injectable({
  providedIn: 'root'
})
export class AppliedPersonelService {

  private readonly APPLIED_PERSONELS = '/application/appliedPersonel/';
  private readonly GET_LOOKUPS = '/settings/getlookupDetails/';

  constructor(private repoService: RepositoryService, @Inject('BASE_API_URL') private baseUrl: string) { }

  getAppliedPersonelForVacancy(id: number) {
    return  this.repoService.sendRequest('GET', this.baseUrl + this.APPLIED_PERSONELS + id);
  }
  downloadFile(documentId: number, fileTypeId: number, userName: string) {
    return this.repoService.httpClient.get(this.baseUrl + '/application/downloadFile?documentId='
     + documentId + '&applicationId=' + fileTypeId , {responseType: 'blob'})
      .subscribe((res: any) => {
        return saveFile(res, userName);
      });
  }

  advanceSearch(data: AppliedPersonelFilter) {
    const options = {body: data};
     return this.repoService.sendRequest('POST', this.baseUrl + '/application/search', options);
  }
  getLookups(code: string) {
    return this.repoService.sendRequest('GET', this.baseUrl + this.GET_LOOKUPS + code);
  }

  advanceSearchForExcel(data: AppliedPersonelFilter) {
    const options = {body: data};
    return this.repoService.sendRequest('POST', this.baseUrl + '/application/search-excel', options);
  }

  addOrUpdateApplicantsForWrittenExam(applicantsForWrittenExam: any) {
    const options = {body: applicantsForWrittenExam};
    return this.repoService.sendRequest('POST', this.baseUrl + '/application/applicants-for-written-exam', options);
  }

  removeApplicantsForWrittenExam(applicantsForWrittenExam: any) {
    const options = {body: applicantsForWrittenExam};
    return this.repoService.sendRequest('POST', this.baseUrl + '/application/remove-applicants-for-written-exam', options);
  }

  removeApplicantsForInterviewExam(applicantsForInterviewExam: any) {
    const options = {body: applicantsForInterviewExam};
    return this.repoService.sendRequest('POST', this.baseUrl + '/application/remove-applicants-for-interview-exam', options);
  }

  addOrUpdateApplicantsForInterview(applicantsForInterview: any) {
    const options = {body: applicantsForInterview};
    return this.repoService.sendRequest('POST', this.baseUrl + '/application/applicants-for-interview-exam', options);
  }

  moveToFinalStage(applicantsForInterview: any) {
    const options = {body: applicantsForInterview};
    return this.repoService.sendRequest('POST', this.baseUrl + '/application/move-applicants-to-final-stage', options);
  }

  getApplicantsForWrittenExam(vacancyId: any) {
    return this.repoService.sendRequest('GET', this.baseUrl + '/application/all-applicants-for-wriiten-exam/' + vacancyId);
  }

  getApplicantsForInterview(vacancyId: any) {
    return this.repoService.sendRequest('GET', this.baseUrl + '/application/all-applicants-for-interview/' + vacancyId);
  }

  getFileNameToDownloadExternal(vacancyId: any, userId: any) {
    return this.repoService.sendRequest('GET', this.baseUrl + '/application/fileNameToDownloadExternal/' + vacancyId + '/' + userId);
  }

  getApplicantsForFinalResult(vacancyId: any) {
    return this.repoService.sendRequest('GET', this.baseUrl + '/application/applicants-final-result/' + vacancyId);
  }

}
