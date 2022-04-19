import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApplicantForInterviewModel } from 'src/app/models/applicant.selected.for.interview';
import { ApplicantForWrittenExamModel } from 'src/app/models/applicant.selected.for.we';
import { ExcelExportService } from 'src/app/shared/services/excel-export-service';
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
    private messagingService: MessageService, private excelService: ExcelExportService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    const vacancyId = this.route.snapshot.params['id'];
    this.vacancyTitle = this.route.snapshot.params['title'];
    this.spinner.show();
    this.appliedService.getApplicantsForInterview(vacancyId).subscribe(res => {
       this.appliedPersonels = res as ApplicantForWrittenExamModel[];
       this.spinner.hide();
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

  exportExcel() {
    const excelContents: any = [];
   const headers = ['Applicant_SystemId', 'Applicant Name', 'Exam Code', 'Interview Exam Result'];
    for (let index = 0; index < this.appliedPersonels.length; index++) {
      const element = this.appliedPersonels[index];
       console.log(element);
       excelContents.push([
       element.applicantId,
       element.applicantName,
       element.examCode,
       element.examResult]);
    }
    const title = 'Human Resource Management Directorate Applicants selected for interview  for the Position ' + this.vacancyTitle;
       const fileName = this.vacancyTitle + Date();

       this.excelService.exportAsExcelFileExcelJs(headers, excelContents, fileName, title );
}

}
