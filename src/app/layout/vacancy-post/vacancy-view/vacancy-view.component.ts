import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacancy } from 'src/app/models/vacancy.model';
import { VancancyService } from '../../post-vacancy/vancancy.service';

@Component({
  selector: 'app-vacancy-view',
  templateUrl: './vacancy-view.component.html',
  styleUrls: ['./vacancy-view.component.scss']
})
export class VacancyViewComponent implements OnInit {


  vacancyForm: FormGroup;
  constructor(private vacancyService: VancancyService, private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit() {
    this.initForm();
    const id = this.route.snapshot.params['id'];
    this.vacancyService.getVacancy(id).subscribe(res => {
        const data = res as any;
        this.setForm(data as Vacancy);
    });

  }


  initForm() {
    this.vacancyForm = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      title: new FormControl({value: null, disabled: true}),
      qualification: new FormControl({value: null, disabled: true}),
      workExperience: new FormControl({value: null, disabled: true}),
      location: new FormControl({value: null, disabled: true}),
      postedDate: new FormControl({value: Date(), disabled: true}),
      deadlineDate: new FormControl({value: Date(), disabled: true})
    });
  }

  setForm(vacancy: Vacancy) {
    this.vacancyForm.setValue({
      id: vacancy.id,
      title: vacancy.title,
      qualification: vacancy.qualification,
      workExperience: vacancy.workExperience,
      location: vacancy.location,
      postedDate: formatDate(vacancy.postedDate, 'yyyy-MM-dd', 'en'),
      deadlineDate: formatDate(vacancy.deadlineDate, 'yyyy-MM-dd', 'en'),
    });
  }

  back() {

  }
}
