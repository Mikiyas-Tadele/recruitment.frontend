import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApplicantForInterviewModel } from 'src/app/models/applicant.selected.for.interview';
import { ApplicantForWrittenExamModel } from 'src/app/models/applicant.selected.for.we';
import { AppliedPersonelService } from '../applied-personel/applied-personel.service';

@Component({
  selector: 'app-applicants-for-interview',
  templateUrl: './applicants-for-interview.component.html',
  styleUrls: ['./applicants-for-interview.component.scss']
})
export class ApplicantsForInterviewComponent implements OnInit {
  appliedPersonels: any = [];
  vacancyTitle: string;
  selectedApplicants: any = [];

  constructor(private appliedService: AppliedPersonelService,
    private route: ActivatedRoute, private router: Router, private confirmMessage: ConfirmationService,
    private messagingService: MessageService) { }

  ngOnInit() {
    const vacancyId = this.route.snapshot.params['id'];
    this.vacancyTitle = this.route.snapshot.params['title'];
    this.appliedService.getApplicantsForInterview(vacancyId).subscribe(res => {
       this.appliedPersonels = res as ApplicantForWrittenExamModel[];
    });
  }

  moveForFinalSelection() {
    if (this.selectedApplicants.length > 0) {
      this.confirmMessage.confirm({
        message: 'Are you sure you want to move applicants to the final stage?',
        accept: () => {
        this.appliedService.moveToFinalStage(this.selectedApplicants).subscribe(res => {
          this.messagingService.add({severity: 'success', summary: 'Selection',
          detail: 'You have successfully moved the selected applicants to the final stage'});
        });
        }
      });
    } else {
       this.messagingService.add({severity: 'error', summary: 'Selection',
       detail: 'You have to select at least one applicant!'});
    }
  }
  removeFromList() {
    if (this.selectedApplicants.length > 0) {
      this.confirmMessage.confirm({
        message: 'Are you sure you want to remove the selected applicants from the interview list?',
        accept: () => {
        this.appliedService.removeApplicantsForInterviewExam(this.selectedApplicants).subscribe(res => {
          this.messagingService.add({severity: 'success', summary: 'Selection',
          detail: 'You have successfully removed the applicants from the list'});
        });
        }
      });
    } else {
       this.messagingService.add({severity: 'error', summary: 'Selection',
       detail: 'You have to select at least one applicant!'});
    }
  }

  save() {
    const weList = this.appliedPersonels.filter(data => {
        return (data as ApplicantForInterviewModel).examResult !== 0;
    });
    this.appliedService.addOrUpdateApplicantsForInterview(weList).subscribe(res => {
       this.messagingService.add({severity: 'success', summary: 'Selection',
          detail: 'You have successfully saved the result'});
    });

  }

}
