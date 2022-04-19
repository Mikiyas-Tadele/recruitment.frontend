import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApplicantForInterviewModel } from 'src/app/models/applicant.selected.for.interview';
import { ApplicantForWrittenExamModel } from 'src/app/models/applicant.selected.for.we';
import { ExcelExportService } from 'src/app/shared/services/excel-export-service';
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
     private router: Router,  private confirmMessage: ConfirmationService, private excelService: ExcelExportService,
     private messagingService: MessageService,
     private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.vacancyId = this.route.snapshot.params['id'];
    this.vacancyTitle = this.route.snapshot.params['title'];
    this.spinner.show();
    this.appliedService.getApplicantsForWrittenExam(this.vacancyId).subscribe(res => {
       this.appliedPersonels = res as ApplicantForWrittenExamModel[];
       this.spinner.hide();
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
          window.location.reload();
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
      (data as ApplicantForWrittenExamModel).addOrRemove = false;
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

  exportExcel() {
    const excelContents: any = [];
   const headers = ['Applicant_SystemId', 'Applicant Name', 'Exam Code', 'Written Exam Result'];
    for (let index = 0; index < this.appliedPersonels.length; index++) {
      const element = this.appliedPersonels[index];
       console.log(element);
       excelContents.push([
       element.applicantId,
       element.applicantName,
       element.examCode,
       element.examResult]);
    }
    const title = 'Human Resource Management Directorate Applicants selected for writen exam  for the Position ' + this.vacancyTitle;
       const fileName = this.vacancyTitle + Date();

       this.excelService.exportAsExcelFileExcelJs(headers, excelContents, fileName, title );
}

}
