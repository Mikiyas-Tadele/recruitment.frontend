import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VacancyDetail } from 'src/app/models/vacancy.detail.model';
import { VancancyService } from '../vancancy.service';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.scss']
})
export class VacancyDetailComponent implements OnInit {

   vacancyDetailForm: FormGroup;
   vacancyDetails: any = [];
   vacancyId: any;

    constructor(private vacancyService: VancancyService,
       private router: Router, private route: ActivatedRoute,
       private messageService: MessageService) { }

    ngOnInit() {
      this.initForm();
      console.log(this.route.snapshot.params['vacancyId']);
      this.vacancyId = this.route.snapshot.params['vacancyId'];
      this.vacancyService.getVacancyDetails(this.vacancyId).subscribe(res  => {
         this.vacancyDetails = res;
      });
    }

    initForm() {
      this.vacancyDetailForm = new FormGroup({
         id: new FormControl(''),
         title: new FormControl(''),
         description: new FormControl(''),
         vacancyId: new FormControl('')
      });
    }

    setForm(data: VacancyDetail) {
      this.vacancyDetailForm.setValue({
         id: data.id,
         title: data.title,
         description: data.description,
         vacancyId: data.vacancyId
      });
    }

    save({value, valid}: {value: VacancyDetail, valid: boolean}) {
       value.vacancyId = this.vacancyId;
       console.log(value);
       this.vacancyService.saveVacancyDetail(value).subscribe(res => {
        this.messageService.add({severity: 'success', summary: 'Saved', detail: 'Data Saved Successfully'});
      }, err => {
       this.messageService.add({severity: 'error', summary: 'Saved', detail: err});
      });
    }
  }
