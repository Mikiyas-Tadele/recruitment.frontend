import { Inject, Injectable } from '@angular/core';
import { RepositoryService } from 'src/app/models/services/repository.service';
import { VacancyDetail } from 'src/app/models/vacancy.detail.model';
import { Vacancy } from 'src/app/models/vacancy.model';

@Injectable({
   providedIn: 'root'
})
export class VancancyService {

  private readonly ADD_VACANCY = '/vacancy/vacancy';
  private readonly GET_VANCANCIES = '/vacancy/vacancies';
  private readonly GET_VACANCY = '/vacancy/vacancy';
  private readonly ADD_VACANCY_DETAIL = '/vacancy/vacancyDetail';
  private readonly GET_VACANCY_DETAILS = '/vacancy/vacancyDetails';
  private readonly DELETE_VACANCY_DETAIL = '/vacancy/delete-vacancyDetails/';


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

  deleteVacancy(data: Vacancy) {
    const options = {body: data};
    return this.repoService.sendRequest('DELETE', this.baseUrl + this.ADD_VACANCY, options);
  }

  deleteVacancyDetail(id: any) {
    return this.repoService.sendRequest('GET', this.baseUrl + this.DELETE_VACANCY_DETAIL + id);
  }

}
