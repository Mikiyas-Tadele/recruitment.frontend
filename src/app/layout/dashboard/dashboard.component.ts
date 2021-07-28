import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vacancy } from 'src/app/models/vacancy.model';
import { routerTransition } from '../../router.animations';
import { VancancyService } from '../post-vacancy/vacancy-detail/vancancy.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    vacancies: Vacancy[] = [];

    constructor(private vacancyService: VancancyService, private router: Router) { }

    ngOnInit() {

      this.vacancyService.getVcancies().subscribe(res => {
        this.vacancies = res as any;
      });

    }

    appliedPersonel(data: Vacancy) {
        this.router.navigate(['admin/appliedPersonel/' + data.id]);
    }

    goToView(data: Vacancy) {
      this.router.navigate(['admin/post-vacancy/' + data.id]);
    }
}
