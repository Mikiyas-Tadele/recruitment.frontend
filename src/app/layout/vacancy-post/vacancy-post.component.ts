import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vacancy } from 'src/app/models/vacancy.model';
import { VancancyService } from '../post-vacancy/vancancy.service';

@Component({
  selector: 'app-vacancy-post',
  templateUrl: './vacancy-post.component.html',
  styleUrls: ['./vacancy-post.component.scss']
})
export class VacancyPostComponent implements OnInit {

  vacancies: Vacancy[] = [];

  constructor(private vacancyService: VancancyService, private router: Router) { }

  ngOnInit() {

    this.vacancyService.getVcancies().subscribe(res => {
      this.vacancies = res as any;
    });

  }

  goToView(data: Vacancy) {
    this.router.navigate(['vacancy-view/' + data.id]);
  }
  apply(data: Vacancy) {
    this.router.navigate(['apply/' + data.id]);
  }
}
