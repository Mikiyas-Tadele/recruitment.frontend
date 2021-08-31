import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Inject, Injectable } from '@angular/core';
import { InternalVacancyModel } from 'src/app/models/internal.vacancy.model';
import { RepositoryService } from 'src/app/models/services/repository.service';

@Injectable({
  providedIn: 'root'
})
export class InternalVacancyService {

  readonly ADD_VACANCY = '/vacancy/internal-vacancy';
  readonly GET_VANCANCIES = '/vacancy/internal-vacancies';
  readonly GET_VACANCY = '/vacancy/internal-vacancy';
  readonly INTERNAL_APPLY = '/application/internalApplication';
  readonly INTERNAL_APPLICATION = '/application/internalApplications';


  constructor(private repoService: RepositoryService, @Inject('BASE_API_URL') private baseUrl: string) { }

  addOrUpdateVacancy(data: InternalVacancyModel) {
    const options = {body: data};
    return this.repoService.sendRequest('POST', this.baseUrl + this.ADD_VACANCY, options);
  }

  getAllInternalVacancies() {
    return this.repoService.sendRequest('GET', this.baseUrl + this.GET_VANCANCIES);
  }

  getAllInternalVacanciesByPlacement(placement: string) {
    return this.repoService.sendRequest('GET', this.baseUrl + this.GET_VANCANCIES + '/' + placement);
  }

  getInternalVacancy(id: number) {
    return this.repoService.sendRequest('GET', this.baseUrl + this.GET_VACANCY + '/' + id);
  }

  applyForInternalPosition(ids: any) {
    const options = {body: ids};
    return this.repoService.sendRequest('POST', this.baseUrl + this.INTERNAL_APPLY, options);
  }

  getInternalApplicationsByVacancy(id: number) {
    return this.repoService.sendRequest('GET', this.baseUrl + this.INTERNAL_APPLICATION + '/' + id);
  }
}
