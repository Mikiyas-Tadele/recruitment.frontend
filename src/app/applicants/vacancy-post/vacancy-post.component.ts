import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { VacancieslFilter } from 'src/app/models/vacanciesl-filter.model';
import { Vacancy } from 'src/app/models/vacancy.model';
import { TokenStorage } from 'src/app/shared/guard/token.storage';
import { VancancyService } from './vancancy.service';

@Component({
  selector: 'app-vacancy-post',
  templateUrl: './vacancy-post.component.html',
  styleUrls: ['./vacancy-post.component.scss']
})
export class VacancyPostComponent implements OnInit {

  vacancies: Vacancy[] = [];
  vacancyFilterForm: FormGroup;
  vacanvyTitles: any = [];


  constructor(private vacancyService: VancancyService,
    private router: Router, private tokenStorage: TokenStorage) { }

  ngOnInit() {
    this.initForm();
    this.getVacancies();

  }

  private getVacancies() {
     this.vacanvyTitles = [];
    this.vacancyService.getVcancies().subscribe(res => {
      this.vacancies = res as Vacancy[];
      for (let i = 0; i < this.vacancies.length; i++) {
        const element = this.vacancies[i];
        const l = { label: element.title, value: element.id };
        this.vacanvyTitles.push(l);
      }


    });
  }

  goToView(data: Vacancy) {
    this.router.navigate(['vacancy-view/' + data.id]);
  }
  apply(data: Vacancy) {
    if (this.tokenStorage.getToken() != null) {
      this.router.navigate(['apply/' + data.id + '/' + data.title]);
    } else {
      this.router.navigate(['login']);
    }
  }
  search({value, valid}: { value: VacancieslFilter, valid: boolean }) {
    if (valid) {
     this.vacancies = this.vacancies.filter(v => {
        return v.id === value.vacancyId;
     });
    } else {
       this.getVacancies();
    }
  // this.repo.getVacancies(value.title);

  }

  clearSearch() {
    this.getVacancies();
  }
  initForm() {
    this.vacancyFilterForm = new FormGroup({
      title: new FormControl(''),
      vacancyId: new FormControl(''),
    });
}
loadData(event) {
  // event.first = First row offset
  // event.rows = Number of rows per page
}
}
