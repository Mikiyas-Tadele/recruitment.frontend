import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/app/models/services/repository.service';
import { VacancieslFilter } from 'src/app/models/vacanciesl-filter.model';
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
    vacancyFilterForm: FormGroup;
    constructor(private vacancyService: VancancyService, private router: Router, private repo: RepositoryService) { }

    ngOnInit() {
this.initForm();
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
}
