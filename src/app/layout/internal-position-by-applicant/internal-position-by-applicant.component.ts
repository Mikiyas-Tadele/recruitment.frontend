import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternalVacancyModel } from 'src/app/models/internal.vacancy.model';
import { ExcelExportService } from 'src/app/shared/services/excel-export-service';
import { InternalVacancyService } from '../post-vacancy/internal-vacancies/internal-vacancy.service';

@Component({
  selector: 'app-internal-position-by-applicant',
  templateUrl: './internal-position-by-applicant.component.html',
  styleUrls: ['./internal-position-by-applicant.component.scss']
})
export class InternalPositionByApplicantComponent implements OnInit {

  appliedPersonels: any = [];
  vacancyName: string;
  constructor(private route: ActivatedRoute,
    private internalVacancyService: InternalVacancyService, private excelService: ExcelExportService) { }

  ngOnInit() {
    this.internalVacancyService.getInternalPositionByApplicant().subscribe(res => {
      this.appliedPersonels = res;
    });
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

onSort() {
}


}
