import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct,NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(private vacancyService: VancancyService, private messageService: MessageService,
     private router: Router, private route: ActivatedRoute, ) { }


  ngOnInit() {
    this.initForm();
    const id = this.route.snapshot.params['id'];
    if (id !== '0') {
    this.vacancyService.getVacancy(id).subscribe(res => {
      this.vacancy = res as Vacancy;
      if (this.vacancy != null) {
        this.setForm(this.vacancy);
      }
    });
  }
  }
save({value, valid}: { value: Vacancy, valid: boolean }) {
   this.vacancyService.saveVacancy(value).subscribe(res => {
     this.vacancy = res;
    this.messageService.add({severity: 'success', summary: 'Saved', detail: 'Data Saved Successfully'});
   }, err => {
    this.messageService.add({severity: 'error', summary: 'Saved', detail: err});
   });
}

initForm() {
  this.vacancyForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    qualification: new FormControl('', Validators.required),
    workExperience: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    postedDate: new FormControl(new Date),
    deadlineDate: new FormControl(new Date),
    salary: new FormControl('', Validators.required),
    salaryDescription: new FormControl('', Validators.required),
    requiredNumber: new FormControl('', Validators.required),
    employementCondition: new FormControl('', Validators.required),
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
    deadlineDate: formatDate(vacancy.deadlineDate, 'yyyy-MM-dd', 'en')
  });
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
