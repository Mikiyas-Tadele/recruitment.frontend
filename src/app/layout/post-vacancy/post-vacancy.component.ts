import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CustomAdapter } from 'src/app/models/services/custom-adapter.service';
import { CustomDateParserFormatter } from 'src/app/models/services/custom-date-parser-formatter.service';
import { Vacancy } from 'src/app/models/vacancy.model';
import { VancancyService } from './vacancy-detail/vancancy.service';

@Component({
  selector: 'app-post-vacancy',
  templateUrl: './post-vacancy.component.html',
  styleUrls: ['./post-vacancy.component.scss'],
  providers: [ {provide: FormGroup},
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class PostVacancyComponent implements OnInit {
vacancyForm: FormGroup;
vacancy: any;
minDate: Date;
maxDate: Date;
saved = false;
  constructor(private vacancyService: VancancyService, private messageService: MessageService,
     private router: Router, private route: ActivatedRoute, ) {
      this.minDate = new Date();
      this.maxDate = new Date();
      this.minDate.setFullYear(this.minDate.getFullYear());
      this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
     }


  ngOnInit() {
    this.initForm();
    const id = this.route.snapshot.params['id'];
    if (id !== '0') {
    this.vacancyService.getVacancy(id).subscribe(res => {
      this.vacancy = res as Vacancy;
      this.setForm(this.vacancy);

    });
  }
  }
save({value, valid}: { value: Vacancy, valid: boolean }) {
  if (valid) {
    this.saved = true;
   this.vacancyService.saveVacancy(value).subscribe(res => {
      this.vacancy = res as Vacancy;
    this.messageService.add({severity: 'success', summary: 'Saved', detail: 'Data Saved Successfully'});
    this.vacancyForm.reset({});
    this.saved = false;
   }, err => {
    this.messageService.add({severity: 'error', summary: 'Saved', detail: err});
    this.saved = false;
   });
  } else {
    this.messageService.add({severity: 'error', summary: 'Saved', detail: 'Please fill the form data properly!'});
    this.saved = false;
  }
}

initForm() {
  this.vacancyForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    qualification: new FormControl('', Validators.required),
    workExperience: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    postedDate: new FormControl(new Date, Validators.required),
    deadlineDate: new FormControl(new Date, Validators.required),
    salary: new FormControl(''),
    salaryDescription: new FormControl(''),
    requiredNumber: new FormControl('', Validators.required),
    employmentCondition: new FormControl('', Validators.required),
    cgpa: new FormControl('')
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
    salary: vacancy.salary,
    salaryDescription: vacancy.salaryDescription,
    requiredNumber: vacancy.requiredNumber,
    employmentCondition: vacancy.employmentCondition,
    cgpa: vacancy.cgpa
  });
  console.log(this.vacancyForm);
}

detailForm() {
  if (this.vacancy != null) {
    this.router.navigate(['admin/vacancyDetailForm/' + this.vacancy.id]);
  }
}

back() {
  this.router.navigate(['admin/dashboard']);
}

clear() {
  this.vacancyForm.reset({});
}

}
