import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternalVacancyModel } from 'src/app/models/internal.vacancy.model';
import { ExcelExportService } from 'src/app/shared/services/excel-export-service';
import { InternalVacancyService } from '../post-vacancy/internal-vacancies/internal-vacancy.service';

@Component({
  selector: 'app-internal-applicants-by-position',
  templateUrl: './internal-applicants-by-position.component.html',
  styleUrls: ['./internal-applicants-by-position.component.scss']
})
export class InternalApplicantsByPositionComponent implements OnInit {

  appliedPersonels: any = [];
  vacancyName: string;
  constructor(private route: ActivatedRoute,
    private internalVacancyService: InternalVacancyService, private excelService: ExcelExportService) { }

  ngOnInit() {
    this.internalVacancyService.getInternalApplicantsByPosition().subscribe(res => {
      this.appliedPersonels = res;
    });
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
       element.positionThree]);
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

onSort() {
}

}
