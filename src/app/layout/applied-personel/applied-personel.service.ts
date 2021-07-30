import { Inject, Injectable } from '@angular/core';
import { AppliedPersonelFilter } from 'src/app/models/applied-personel-filter.model';
import { saveFile } from 'src/app/models/services/file.saver.helper';
import { RepositoryService } from 'src/app/models/services/repository.service';

@Injectable({
  providedIn: 'root'
})
export class AppliedPersonelService {

  private readonly APPLIED_PERSONELS = '/application/appliedPersonel/';

  constructor(private repoService: RepositoryService, @Inject('BASE_API_URL') private baseUrl: string) { }

  getAppliedPersonelForVacancy(id: number) {
    return  this.repoService.sendRequest('GET', this.baseUrl + this.APPLIED_PERSONELS + id);
  }
  downloadFile(documentId: number, fileTypeId: number, userName: string) {
    return this.repoService.httpClient.get(this.baseUrl + '/application/downloadFile?documentId='
     + documentId + '&fileTypeId=' + fileTypeId , {responseType: 'blob'})
      .subscribe((res: any) => {
        console.log(res);
        return saveFile(res, userName);
      });
  }

  advanceSearch(data: AppliedPersonelFilter) {
    const options = {body: data};
     return this.repoService.sendRequest('POST', this.baseUrl + '/application/search', options);
  }
}
