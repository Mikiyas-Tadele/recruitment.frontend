import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternalApplicantByPosition } from 'src/app/models/internal.applicant.by.position';
import { ExcelExportService } from 'src/app/shared/services/excel-export-service';
import { InternalVacancyService } from '../post-vacancy/internal-vacancies/internal-vacancy.service';

@Component({
  selector: 'app-internal-applicants-by-non-managerial-position',
  templateUrl: './internal-applicants-by-non-managerial-position.component.html',
  styleUrls: ['./internal-applicants-by-non-managerial-position.component.scss']
})
export class InternalApplicantsByNonManagerialPositionComponent implements OnInit {

  appliedPersonels: any = [];
  vacancyName: string;
  appliedPersonelsCols: any = [];
  constructor(private route: ActivatedRoute,
    private internalVacancyService: InternalVacancyService, private excelService: ExcelExportService) { }

  ngOnInit() {
    this.internalVacancyService.getInternalApplicantsByNonManagerialPosition().subscribe(res => {
      this.appliedPersonels = res;
    });
    this.appliedPersonelsCols = [
      {field: 'employeeId', header: 'Employee ID'},
      {field: 'employeeName', header: 'Employee Name'},
      {field: 'positionOne', header: 'Position One'},
      {field: 'positionTwo', header: 'Position Two'},
      {field: 'positionThree', header: 'Position Three'},
      {field: 'positionFour', header: 'Position Four'},
      {field: 'positionFive', header: 'Position Five'},
      {field: 'positionSix', header: 'Position Six'},
    ];
  }

  exportExcel() {
    const excelContents: any = [];
   const headers = ['Employee ID', 'Employee Name', 'Position One', 'Position Two', 'Position Three'];
    for (let index = 0; index < this.appliedPersonels.length; index++) {
      const element = this.appliedPersonels[index];
       console.log(element);
       excelContents.push([element.employeeId,
       element.employeeName,
       element.positionOne,
       element.positionTwo,
       element.positionThree,
      element.positionFour,
     element.positionFive,
    element.positionSix,
    this.getDateFormatted(element.appliedDate)]);
    }
    const title = 'Development Bank of Ethiopia';
       const fileName = 'Report ' + Date();

       this.excelService.exportAsExcelFileExcelJs(headers, excelContents, fileName, title );
}

getDateFormatted(startDate: Date) {
  if (startDate != null ) {
     return formatDate(startDate, 'yyyy-MM-dd', 'en');
  }  else {
    return '';
  }
}
download1(data: InternalApplicantByPosition) {
    this.internalVacancyService.getFileNameToDownload(data.vacancyId1, data.employeeId)
       .subscribe(name => {
        console.log(name);
        this.internalVacancyService.downloadFile(data.employeeId, data.vacancyId1, name);
      });
}
download2(data: InternalApplicantByPosition) {
  this.internalVacancyService.getFileNameToDownload(data.vacancyId2, data.employeeId)
  .subscribe(name => {
   console.log(name);
   this.internalVacancyService.downloadFile(data.employeeId, data.vacancyId2, name);
 });
}
download3(data: InternalApplicantByPosition) {
  this.internalVacancyService.getFileNameToDownload(data.vacancyId3, data.employeeId)
  .subscribe(name => {
   console.log(name);
   this.internalVacancyService.downloadFile(data.employeeId, data.vacancyId3, name);
 });
}

onSort() {
}

}
