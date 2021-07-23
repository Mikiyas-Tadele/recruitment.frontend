import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Vacancy } from 'src/app/models/vacancy.model';
import { VancancyService } from './vancancy.service';

@Component({
  selector: 'app-post-vacancy',
  templateUrl: './post-vacancy.component.html',
  styleUrls: ['./post-vacancy.component.scss'],
  providers: [FormGroupDirective]
})
export class PostVacancyComponent implements OnInit {
vacancyForm: FormGroup;
vacancy: any;
  constructor(private vacancyService: VancancyService, private messageService: MessageService,
     private router: Router) { }

  ngOnInit() {
    this.initForm();
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
    title: new FormControl(''),
    qualification: new FormControl(''),
    workExperience: new FormControl(''),
    location: new FormControl(''),
    postedDate: new FormControl(new Date),
    deadlineDate: new FormControl(new Date)
  });
}

setForm(vacancy: Vacancy) {
  this.vacancyForm.setValue({
    id: vacancy.id,
    title: vacancy.title,
    qualification: vacancy.qualification,
    workExperience: vacancy.workExperience,
    location: vacancy.location,
    postedDate: vacancy.postedDate,
    deadlineDate: vacancy.deadlineDate
  });
}

detailForm() {
  if (this.vacancy != null) {
    this.router.navigate(['vacancyDetailForm/' + this.vacancy.id]);
  }
}

}
