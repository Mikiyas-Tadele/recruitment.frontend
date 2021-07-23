import { Inject, Injectable } from '@angular/core';
import { RepositoryService } from 'src/app/models/services/repository.service';
import { Vacancy } from 'src/app/models/vacancy.model';

@Injectable({
  providedIn: 'root'
})
export class VancancyService {

  readonly ADD_VACANCY = '/vacancy/vacancy';
  readonly GET_VANCANCIES = '/vacancy/vacancies';
  readonly GET_VACANCY = '/vacancy/vacancy';

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

}
