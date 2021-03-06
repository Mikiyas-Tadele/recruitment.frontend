import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Vacancy } from 'src/app/models/vacancy.model';
import { VancancyService } from '../vancancy.service';


@Component({
  selector: 'app-vacancy-view',
  templateUrl: './vacancy-view.component.html',
  styleUrls: ['./vacancy-view.component.scss']
})
export class VacancyViewComponent implements OnInit {


  vacancyForm: FormGroup;
  vacancyDetails: any = [];
  minDate: Date;
  maxDate: Date;
  constructor(private vacancyService: VancancyService, private route: ActivatedRoute,
     private router: Router, private spinner: NgxSpinnerService) {
      this.minDate = new Date();
      this.maxDate = new Date();
      this.minDate.setFullYear(this.minDate.getFullYear() - 40);
      this.maxDate.setDate(this.maxDate.getDate());
     }

  ngOnInit() {
    this.spinner.show();
    this.initForm();
    const id = this.route.snapshot.params['id'];
    this.vacancyService.getVacancy(id).subscribe(res => {
        const data = res as any;
        this.setForm(data as Vacancy);
        this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

  }


  initForm() {
    this.vacancyForm = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      title: new FormControl({value: null, disabled: true}),
      qualification: new FormControl({value: null, disabled: true}),
      workExperience: new FormControl({value: null, disabled: true}),
      location: new FormControl({value: null, disabled: true}),
      salary: new FormControl({value: null, disabled: true}),
      salaryDescription: new FormControl({value: null, disabled: true}),
      requiredNumber: new FormControl({value: null, disabled: true}),
      employmentCondition: new FormControl({value: null, disabled: true}),
      postedDate: new FormControl({value: Date(), disabled: true}),
      deadlineDate: new FormControl({value: Date(), disabled: true}),
      cgpa: new FormControl({value: null, disabled: true})
    });
  }

  setForm(vacancy: Vacancy) {
    this.vacancyForm.setValue({
      id: vacancy.id,
      title: vacancy.title,
      qualification: vacancy.qualification,
      workExperience: vacancy.workExperience,
      location: vacancy.location,
      postedDate: new Date(vacancy.postedDate),
      deadlineDate: new Date(vacancy.deadlineDate),
      salary : vacancy.salary != null ? vacancy.salary + ' birr' : null,
      salaryDescription : vacancy.salaryDescription,
      requiredNumber: vacancy.requiredNumber,
      employmentCondition: vacancy.employmentCondition,
      cgpa: vacancy.cgpa
    });
    this.vacancyDetails = vacancy.vacancyModelDetailList;
  }

  back() {
   this.router.navigate(['vacancies']);
  }
}
