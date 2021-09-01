import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Inject, Injectable } from '@angular/core';
import { InternalVacancyModel } from 'src/app/models/internal.vacancy.model';
import { saveFile } from 'src/app/models/services/file.saver.helper';
import { RepositoryService } from 'src/app/models/services/repository.service';

@Injectable({
    providedIn: 'root',
})
export class InternalVacancyService {
    private readonly ADD_VACANCY = '/vacancy/internal-vacancy';
    private readonly GET_VANCANCIES = '/vacancy/internal-vacancies';
    private readonly GET_VACANCY = '/vacancy/internal-vacancy';
    private readonly INTERNAL_APPLY = '/application/internalApplication';
    private readonly INTERNAL_APPLICATION = '/application/internalApplications';
    private readonly STORE = '/application/internal-application-store?vacancyId=';
    private readonly INTERNAL_APPLICANT_BY_POSITION = '/application/internalApplicantsByPosition';
    private readonly INTERNAL_POSITION_BY_APPLICANT = '/application/internalPositionByApplicant';

    constructor(
        private repoService: RepositoryService,
        @Inject('BASE_API_URL') private baseUrl: string
    ) {}

    addOrUpdateVacancy(data: InternalVacancyModel) {
        const options = { body: data };
        return this.repoService.sendRequest(
            'POST',
            this.baseUrl + this.ADD_VACANCY,
            options
        );
    }

    getAllInternalVacancies() {
        return this.repoService.sendRequest(
            'GET',
            this.baseUrl + this.GET_VANCANCIES
        );
    }

    getAllInternalVacanciesByPlacement(placement: string) {
        return this.repoService.sendRequest(
            'GET',
            this.baseUrl + this.GET_VANCANCIES + '/' + placement
        );
    }

    getInternalVacancy(id: number) {
        return this.repoService.sendRequest(
            'GET',
            this.baseUrl + this.GET_VACANCY + '/' + id
        );
    }

    applyForInternalPosition(ids: any) {
        const options = { body: ids };
        return this.repoService.sendRequest(
            'POST',
            this.baseUrl + this.INTERNAL_APPLY,
            options
        );
    }

    getInternalApplicationsByVacancy(id: number) {
        return this.repoService.sendRequest(
            'GET',
            this.baseUrl + this.INTERNAL_APPLICATION + '/' + id
        );
    }

    storeInternalApplication(file: any, vacancyId: number) {
        return this.repoService.httpClient.post(
            this.baseUrl + this.STORE + vacancyId,
            file
        );
    }
    downloadFile(employeeId: number, vacancyId: number, userName: string) {
      return this.repoService.httpClient.get(this.baseUrl + '/application/download-Internal-applicant-File?employeeId='
       + employeeId + '&vacancyId=' + vacancyId , {responseType: 'blob'})
        .subscribe((res: any) => {
          console.log(res);
          return saveFile(res, userName);
        });
    }

    getInternalApplicantsByPosition() {
      return this.repoService.sendRequest(
        'GET',
        this.baseUrl + this.INTERNAL_APPLICANT_BY_POSITION
    );
    }

    getInternalPositionByApplicant() {
      return this.repoService.sendRequest(
        'GET',
        this.baseUrl + this.INTERNAL_POSITION_BY_APPLICANT
    );
    }

}
