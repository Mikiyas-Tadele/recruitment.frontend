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
  vacanvyTitles: SelectItem[] = [];
 
  data = [
    {id: 1, name: 'Senior Accountant'},
    {id: 2, name: 'Junior Accountant'},
    {id: 3, name: 'Senior Loan Officer'},
    {id: 4, name: 'Senior Electrical Engineer'}

];


  constructor(private vacancyService: VancancyService,
    private router: Router, private tokenStorage: TokenStorage) { }

  ngOnInit() {
    this.initForm();
    this.vacancyService.getVcancies().subscribe(res => {
      this.vacancies = res as any;
    });

    this.vacanvyTitles = this.data.map(item =>
      ({
        label: item.name,
        value: item.id
      }));

  }

  goToView(data: Vacancy) {
    this.router.navigate(['vacancy-view/' + data.id]);
  }
  apply(data: Vacancy) {
    if (this.tokenStorage.getToken() != null) {
      this.router.navigate(['apply/' + data.id]);
    } else {
      this.router.navigate(['login']);
    }
  }
  search({value, valid}: { value: VacancieslFilter, valid: boolean }) {
    if(valid)
    console.log(value.title);
  // this.repo.getVacancies(value.title);

  }
  initForm() {
    this.vacancyFilterForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
}
loadData(event) {
  //event.first = First row offset
  //event.rows = Number of rows per page
}
}
