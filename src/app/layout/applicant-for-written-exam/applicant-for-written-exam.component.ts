import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApplicantForInterviewModel } from 'src/app/models/applicant.selected.for.interview';
import { ApplicantForWrittenExamModel } from 'src/app/models/applicant.selected.for.we';
import { AppliedPersonelService } from '../applied-personel/applied-personel.service';

@Component({
  selector: 'app-applicant-for-written-exam',
  templateUrl: './applicant-for-written-exam.component.html',
  styleUrls: ['./applicant-for-written-exam.component.scss']
})
export class ApplicantForWrittenExamComponent implements OnInit {
  appliedPersonels: any = [];
   vacancyTitle: string;
   selectedApplicants: any = [];
   vacancyId: any;


  constructor(private appliedService: AppliedPersonelService, private route: ActivatedRoute,
     private router: Router,  private confirmMessage: ConfirmationService, private messagingService: MessageService) { }

  ngOnInit() {
    this.vacancyId = this.route.snapshot.params['id'];
    this.vacancyTitle = this.route.snapshot.params['title'];
    this.appliedService.getApplicantsForWrittenExam(this.vacancyId).subscribe(res => {
       this.appliedPersonels = res as ApplicantForWrittenExamModel[];
    });

  }

  moveForInterview() {
    if (this.selectedApplicants.length > 0) {
      this.confirmMessage.confirm({
        message: 'Are you sure you want to move the selected applicants for the written exam?',
        accept: () => {
         const  interviewExamApplicantList = this.getIEApplicantList();
        this.appliedService.addOrUpdateApplicantsForInterview(interviewExamApplicantList).subscribe(res => {
          this.messagingService.add({severity: 'success', summary: 'Selection',
          detail: 'You have successfully selected applicants for interview, to un-select please go to applicants list for interview page'});
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
        message: 'Are you sure you want to remove the selected applicants from the written exam list?',
        accept: () => {
        this.appliedService.removeApplicantsForWrittenExam(this.selectedApplicants).subscribe(res => {
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
        return (data as ApplicantForWrittenExamModel).examResult !== 0;
    });
    this.appliedService.addOrUpdateApplicantsForWrittenExam(weList).subscribe(res => {
       this.messagingService.add({severity: 'success', summary: 'Selection',
       detail: 'You have successfully saved the result'});
    });

  }

  getIEApplicantList() {
    const IEApplicantList: any = [];
    for (let index = 0; index < this.selectedApplicants.length; index++) {
      const element = this.selectedApplicants[index] as ApplicantForWrittenExamModel;
      const applicant = new ApplicantForInterviewModel();
      applicant.applicantId = element.applicantId;
      applicant.examResult = 0.0;
      applicant.vacancyId = this.vacancyId;
      IEApplicantList.push(applicant);
    }
    return IEApplicantList;
  }

}
