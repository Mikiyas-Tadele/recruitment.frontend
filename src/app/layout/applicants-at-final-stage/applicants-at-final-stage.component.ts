import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FinalResultModel } from 'src/app/models/final.result.view';
import { ExcelExportService } from 'src/app/shared/services/excel-export-service';
import { AppliedPersonelService } from '../applied-personel/applied-personel.service';

@Component({
  selector: 'app-applicants-at-final-stage',
  templateUrl: './applicants-at-final-stage.component.html',
  styleUrls: ['./applicants-at-final-stage.component.scss']
})
export class ApplicantsAtFinalStageComponent implements OnInit {
  appliedPersonels: any = [];
  vacancyTitle: string;
  selectedApplicants: any = [];

  constructor(private appliedService: AppliedPersonelService,
    private route: ActivatedRoute, private router: Router, private excelService: ExcelExportService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    const vacancyId = this.route.snapshot.params['id'];
    this.vacancyTitle = this.route.snapshot.params['title'];
    this.spinner.show();
    this.appliedService.getApplicantsForFinalResult(vacancyId).subscribe(res => {
       this.appliedPersonels = res as FinalResultModel[];
       this.spinner.hide();
    });
  }

  exportExcel() {
    const excelContents: any = [];
   const headers = ['Applicant Name', 'Exam Code', 'Written Exam Result',
    'Interview Result', 'Gross Total', 'Total(100%)'];
    for (let index = 0; index < this.appliedPersonels.length; index++) {
      const element = this.appliedPersonels[index];
       console.log(element);
       excelContents.push([
       element.applicantName,
       element.examCode,
       element.writtenExamResult,
       element.interviewResult,
       element.totalResult,
       (element.totalResult / 2).toFixed(2)
       ]);
    }
    const title = 'Human Resource Management Directorate Applicants final selection  for the Position ' + this.vacancyTitle;
       const fileName = this.vacancyTitle + Date();

       this.excelService.exportAsExcelFileExcelJs(headers, excelContents, fileName, title );
}

}
