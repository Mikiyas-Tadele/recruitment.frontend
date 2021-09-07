import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternalPositionByApplicant } from 'src/app/models/internal.position.by.applicant';
import { ExcelExportService } from 'src/app/shared/services/excel-export-service';
import { InternalVacancyService } from '../post-vacancy/internal-vacancies/internal-vacancy.service';

@Component({
  selector: 'app-internal-non-managerial-position-by-applicant',
  templateUrl: './internal-non-managerial-position-by-applicant.component.html',
  styleUrls: ['./internal-non-managerial-position-by-applicant.component.scss']
})
export class InternalNonManagerialPositionByApplicantComponent implements OnInit {

  appliedPersonels: any = [];
  vacancyName: string;
  appliedPersonelsCols: any = [];
  constructor(private route: ActivatedRoute,
    private internalVacancyService: InternalVacancyService, private excelService: ExcelExportService) { }

  ngOnInit() {
    this.internalVacancyService.getInternalNonManagerialPositionByApplicant().subscribe(res => {
      this.appliedPersonels = res;
    });
    this.appliedPersonelsCols = [
      {field: 'employeeId', header: 'Employee ID'},
      {field: 'employeeName', header: 'Employee Name'},
      {field: 'positionOne', header: 'Position One'},
      {field: 'positionTwo', header: 'Position Two'},
      {field: 'positionThree', header: 'Position Three'}
    ];
  }

  exportExcel() {
    const excelContents: any = [];
   const headers = ['Position', 'Employee ID', 'Employee Name'];
    for (let index = 0; index < this.appliedPersonels.length; index++) {
      const element = this.appliedPersonels[index];
       console.log(element);
       excelContents.push([element.position,
       element.employeeId,
       element.employeeName]);
    }
    const title = 'Development bank of Ethiopia';
       const fileName = 'report ' + Date();

       this.excelService.exportAsExcelFileExcelJs(headers, excelContents, fileName, title );
}

getDateFormatted(startDate: Date) {
  if (startDate != null ) {
     return formatDate(startDate, 'yyyy-MM-dd', 'en');
  }  else {
    return '';
  }
}
download(data: InternalPositionByApplicant) {
  this.internalVacancyService.getFileNameToDownload(data.vacancyId, data.employeeId)
     .subscribe(name => {
      console.log(name);
      this.internalVacancyService.downloadFile(data.employeeId, data.vacancyId, name);
    });

}

onSort() {
}

}
