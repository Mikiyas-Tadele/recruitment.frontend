import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternalVacancyModel } from 'src/app/models/internal.vacancy.model';
import { routerTransition } from 'src/app/router.animations';
import { InternalVacancyService } from './internal-vacancy.service';

@Component({
  selector: 'app-internal-vacancies',
  templateUrl: './internal-vacancies.component.html',
  styleUrls: ['./internal-vacancies.component.scss'],
  animations: [routerTransition()]
})
export class InternalVacanciesComponent implements OnInit {

  vacancies: any = [];

  constructor(private internalVacancyService: InternalVacancyService, private router: Router) { }

  ngOnInit() {
   this.getVacancies();
  }

  private getVacancies() {
   this.internalVacancyService.getAllInternalVacancies().subscribe(res => {
     this.vacancies = res as InternalVacancyModel[];
   });
 }

appliedPersonel(data: InternalVacancyModel) {
      this.router.navigateByUrl('admin/appliedInternalPersonel/' + data.id);
}

goToView(data: InternalVacancyModel) {
  this.router.navigate(['admin/internalVacancy/' + data.id]);
}

addNew() {
  this.router.navigate(['admin/internalVacancy/0']);
}


}
