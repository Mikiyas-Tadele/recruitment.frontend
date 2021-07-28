import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private vacancyService: VancancyService,
    private router: Router, private tokenStorage: TokenStorage) { }

  ngOnInit() {

    this.vacancyService.getVcancies().subscribe(res => {
      this.vacancies = res as any;
    });

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
}
