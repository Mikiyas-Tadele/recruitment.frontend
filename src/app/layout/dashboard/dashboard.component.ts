import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
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
    vacanvyTitles: SelectItem[] = [];

    constructor(private vacancyService: VancancyService, private router: Router,
      private zone: NgZone, private confirmMessage: ConfirmationService,
      private messagingService: MessageService,
      private spinner: NgxSpinnerService) { }

    ngOnInit() {
       this.initForm();
      this.getVacancies();
    }
    private getVacancies() {
        this.vacanvyTitles = [];
        this.spinner.show();
       this.vacancyService.getVcancies().subscribe(res => {
         this.vacancies = res as Vacancy[];
         this.spinner.hide();
         for (let i = 0; i < this.vacancies.length; i++) {
           const element = this.vacancies[i];
           const l = { label: element.title, value: element.id };
           this.vacanvyTitles.push(l);
         }
       });
     }

    appliedPersonel(data: Vacancy) {
        this.zone.run(() => {
          this.router.navigateByUrl('admin/appliedPersonel/' + data.id);
        });
    }

    applicantForWrittenExam(data: Vacancy) {
      this.zone.run(() => {
        this.router.navigateByUrl('admin/applicantForWrittenExam/' + data.id + '/' + data.title);
      });
    }

    applicantForInterview(data: Vacancy) {
      this.zone.run(() => {
        this.router.navigateByUrl('admin/applicantForInterview/' + data.id + '/' + data.title);
      });
    }

    goToView(data: Vacancy) {
      this.router.navigate(['admin/post-vacancy/' + data.id]);
    }
    cancelVacancy(data: Vacancy) {
      this.confirmMessage.confirm({
        message: 'Are you sure you want to remove the vacancy post?',
        accept: () => {
          this.spinner.show();
        this.vacancyService.deleteVacancy(data).subscribe(res => {
          this.messagingService.add({severity: 'success', summary: 'Selection',
          detail: 'You have successfully removed the vacancy from the list'});
          this.spinner.hide();
          window.location.reload();
        }, err => {
          this.messagingService.add({severity: 'error', summary: 'Saved', detail: err.error.message});
          this.spinner.hide();
         }  );
        }, reject: () => {
          this.spinner.hide();
        }
      });
    }

    search({value, valid}: { value: VacancieslFilter, valid: boolean }) {
        if (valid) {
            this.vacancies = this.vacancies.filter(v => {
               return v.id === value.vacancyId;
            });
           } else {
              this.getVacancies();
           }

    }
    initForm() {
      this.vacancyFilterForm = new FormGroup({
        vacancyId: new FormControl(''),

      });
    }
    clearSearch() {
        this.getVacancies();
      }
      applicantsFinalSelected(data: Vacancy) {
        this.zone.run(() => {
          this.router.navigateByUrl('admin/applicantAtFinalStage/' + data.id + '/' + data.title);
        });
      }
}
