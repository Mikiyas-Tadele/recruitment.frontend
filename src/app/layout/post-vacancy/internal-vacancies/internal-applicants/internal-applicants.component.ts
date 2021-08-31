import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternalVacancyModel } from 'src/app/models/internal.vacancy.model';
import { ExcelExportService } from 'src/app/shared/services/excel-export-service';
import { InternalVacancyService } from '../internal-vacancy.service';

@Component({
  selector: 'app-internal-applicants',
  templateUrl: './internal-applicants.component.html',
  styleUrls: ['./internal-applicants.component.scss']
})
export class InternalApplicantsComponent implements OnInit {

  appliedPersonels: any = [];
  vacancyName: string;
  constructor(private route: ActivatedRoute,
    private internalVacancyService: InternalVacancyService, private excelService: ExcelExportService) { }

  ngOnInit() {
    const vacancyId = this.route.snapshot.params['id'];
    this.internalVacancyService.getInternalVacancy(vacancyId).subscribe(
      res => {
        const v = res as InternalVacancyModel;
        this.vacancyName = v.position;
      }
    );
    this.internalVacancyService.getInternalApplicationsByVacancy(vacancyId).subscribe(res => {
      this.appliedPersonels = res;
    });
  }

  exportExcel() {
    const excelContents: any = [];
   const headers = ['Employee Name', 'Position', 'Work Unit', 'Location', 'Applied Date'];
    for (let index = 0; index < this.appliedPersonels.length; index++) {
      const element = this.appliedPersonels[index];
       console.log(element);
       excelContents.push([element.name,
       element.position,
       element.workUnit,
       element.location,
       this.getDateFormatted( element.appliedDate),
       element.totalExperience]);
    }
    const title = 'Human Resource Management Directorate Applicants profile Summary for the Position ' + this.vacancyName;
       const fileName = this.vacancyName + Date();

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
