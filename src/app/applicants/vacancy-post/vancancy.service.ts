import { Inject, Injectable } from '@angular/core';
import { RepositoryService } from 'src/app/models/services/repository.service';
import { VacancyDetail } from 'src/app/models/vacancy.detail.model';
import { Vacancy } from 'src/app/models/vacancy.model';

@Injectable({
   providedIn: 'root'
})
export class VancancyService {

  readonly ADD_VACANCY = '/vacancy/vacancy';
  readonly GET_VANCANCIES = '/vacancy/active-vacancies';
  readonly GET_VACANCY = '/vacancy/vacancy';
  readonly ADD_VACANCY_DETAIL = '/vacancy/vacancyDetail';
  readonly GET_VACANCY_DETAILS = '/vacancy/vacancyDetails';

  constructor(private repoService: RepositoryService, @Inject('BASE_API_URL') private baseUrl: string) { }

  saveVacancy(data: Vacancy) {
    const options = {body: data};
    return this.repoService.sendRequest('POST', this.baseUrl + this.ADD_VACANCY, options);
  }

  getVcancies() {
    return this.repoService.sendRequest('GET', this.baseUrl + this.GET_VANCANCIES);
  }

  getVacancy(id: number) {
    return this.repoService.sendRequest('GET', this.baseUrl + this.GET_VACANCY + '/' + id);
  }

  saveVacancyDetail(data: VacancyDetail) {
    const options = {body: data};
    return this.repoService.sendRequest('POST', this.baseUrl + this.ADD_VACANCY_DETAIL, options);
  }

  getVacancyDetails(vacancyId: number) {
    return this.repoService.sendRequest('GET', this.baseUrl + this.GET_VACANCY_DETAILS + '/' + vacancyId);
  }

}
