import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppliedPersonelFilter } from 'src/app/models/applied-personel-filter.model';
import { AppliedPersonelModel } from 'src/app/models/appliedPersonel.model';
import { LookupDetail } from 'src/app/models/lookup.model';
import { RowGroupModel } from 'src/app/models/row.model';
import { Vacancy } from 'src/app/models/vacancy.model';
import { ExcelExportService } from 'src/app/shared/services/excel-export-service';
import { VancancyService } from '../post-vacancy/vacancy-detail/vancancy.service';
import { AppliedPersonelService } from './applied-personel.service';

@Component({
  selector: 'app-applied-personel',
  templateUrl: './applied-personel.component.html',
  styleUrls: ['./applied-personel.component.scss']
})
export class AppliedPersonelComponent implements OnInit {
  constructor(private appliedPersonelService: AppliedPersonelService, private route: ActivatedRoute,
    private vacancyService: VancancyService, private excelService: ExcelExportService) { }
  appliedPersonels: any = [];
  appliedPersonelsExcel: any = [];
  filteredAppliedPersonels: any[];
  appliedPersonelsCol: any = [];
  vacancyName: string;
  filterForm: FormGroup;
  letter: string;
  display = false;
  private readonly qualificationLookupCode = 'QUALIFICATION';
  qualifications: any = [];
  counter = 0;
  rowGroupFullName: RowGroupModel;
  rowGroupEmail: RowGroupModel;
  rowGroupTotal: RowGroupModel;

  onClick(event: Event, menu) {
    menu.toggle(event);
    event.stopPropagation();
  }

  ngOnInit() {
    this.initForm();
    const vacancyId = this.route.snapshot.params['id'];
    const searchModel: AppliedPersonelFilter = new AppliedPersonelFilter();
    searchModel.vacancyId = vacancyId;
    this.appliedPersonelService.advanceSearch(searchModel).subscribe(res => {
      this.counter = 0;
           this.appliedPersonels = res;
           this.updateFullNameRowGroupMetaData1();
           this.updateEmailRowGroupMetaData1();
           this.updateTotalRowGroupMetaData1();
           this.appliedPersonelService.advanceSearchForExcel(searchModel).subscribe(resI => {
            this.appliedPersonelsExcel = resI;
         });
    });
this.filteredAppliedPersonels = this.appliedPersonels;
console.log('Filtered Applied Personel: ' + this.appliedPersonels);
    this.vacancyService.getVacancy(vacancyId).subscribe(res => {
        const v = res as Vacancy;
        this.vacancyName = v.title;
    });
  }

  downloadCV(data: AppliedPersonelModel) {
     this.appliedPersonelService.downloadFile(data.userId, 0, data.fullName);
  }

  downloadQualificationDocument(data: AppliedPersonelModel) {
    this.appliedPersonelService.downloadFile(data.userId, data.applicationId, data.fullName);
  }
  displayAL(data: AppliedPersonelModel) {
   this.letter = data.applicationLetter;
   this.display = true;
  }

  search({value, valid}: { value: AppliedPersonelFilter, valid: boolean }) {
    value.vacancyId = this.route.snapshot.params['id'];
    this.appliedPersonelService.advanceSearch(value).subscribe(res => {
      this.counter = 0;
        this.appliedPersonels = res;
        this.updateFullNameRowGroupMetaData1();
        this.updateEmailRowGroupMetaData1();
        this.updateTotalRowGroupMetaData1();
        this.appliedPersonelService.advanceSearchForExcel(value).subscribe(resI => {
           this.appliedPersonelsExcel = resI;
        });
    });


  }
  initForm() {
    this.filterForm = new FormGroup({
      age: new FormControl(''),
      gender: new FormControl(''),
      cgpa: new FormControl(''),
      cgpaCriteria: new FormControl(''),
      ageCriteria: new FormControl(''),
      qualification: new FormControl(''),
      workExperienceCriteria: new FormControl(''),
      workExperience: new FormControl(''),
      graduationYear: new FormControl(''),
      graduationYearCriteria: new FormControl('')
    });
    this.loadQualificationLookups();
  }

exportExcel() {
        const excelContents: any = [];
       const headers = ['Name', 'Email', 'Age', 'Gender', 'Disability', 'Mobile', 'Fixed',
        'Field of Education',
        'Qualification', 'University', 'Year of Graduation', 'CGPA', 'Organization',
        'Position', 'Salary', 'Duration', 'Total Experience (Years)'];
        for (let index = 0; index < this.appliedPersonelsExcel.length; index++) {
          const element = this.appliedPersonelsExcel[index];
           console.log(element);
           excelContents.push([element.fullName,
           element.email,
           element.age,
           element.gender,
           element.disability,
           element.mobilePhone1,
           element.fixedLinePhone,
           element.fieldOfEducation,
           element.qualificationDesc,
           element.university,
           element.yearOfGraduation,
           element.cgpa,
           element.organization,
           element.position,
           element.salary,
           this.getDateFormatted(element.startDate, element.endDate),
           element.totalExperience]);
        }
        const title = 'Human Resource Management Directorate Applicants profile Summary for the Position ' + this.vacancyName;
           const fileName = this.vacancyName + Date();

           this.excelService.exportAsExcelFileExcelJs(headers, excelContents, fileName, title );
}

loadQualificationLookups() {
  this.appliedPersonelService.getLookups(this.qualificationLookupCode).subscribe(res => {
    const results = res as LookupDetail[];
    for (let index = 0; index < results.length; index++) {
      const element = results[index];
      const q = {label: element.description, value: element.id};
      this.qualifications.push(q);
    }

  });
}
updateFullNameRowGroupMetaData1() {
  this.rowGroupFullName = new RowGroupModel();
  if (this.appliedPersonels) {
      for (let i = 0; i < this.appliedPersonels.length; i++) {
          const rowData = this.appliedPersonels[i];
          const name = rowData.fullName;
          if (i === 0) {
              this.rowGroupFullName[name] = {
                  index: 0,
                  size: 1,
              };
          } else {
              const previousRowData = this.appliedPersonels[i - 1];
              const previousRowGroup = previousRowData.fullName;
              if (name === previousRowGroup) {
                  this.rowGroupFullName[name].size++;
              } else {
                  this.rowGroupFullName[name] = {
                      index: i,
                      size: 1,
                  };
              }
          }
      }
  }
}
updateEmailRowGroupMetaData1() {
  this.rowGroupEmail = new RowGroupModel();
  if (this.appliedPersonels) {
      for (let i = 0; i < this.appliedPersonels.length; i++) {
          const rowData = this.appliedPersonels[i];
          const email = rowData.email;
          if (i === 0) {
              this.rowGroupEmail[email] = {
                  index: 0,
                  size: 1,
              };
          } else {
              const previousRowData = this.appliedPersonels[i - 1];
              const previousRowGroup = previousRowData.email;
              if (email === previousRowGroup) {
                  this.rowGroupEmail[email].size++;
              } else {
                  this.rowGroupEmail[email] = {
                      index: i,
                      size: 1,
                  };
              }
          }
      }
  }
}
updateTotalRowGroupMetaData1() {
  this.rowGroupTotal = new RowGroupModel();
  if (this.appliedPersonels) {
      for (let i = 0; i < this.appliedPersonels.length; i++) {
          const rowData = this.appliedPersonels[i];
          const total = rowData.totalExperience;
          if (i === 0) {
              this.rowGroupTotal[total] = {
                  index: 0,
                  size: 1,
              };
          } else {
              const previousRowData = this.appliedPersonels[i - 1];
              const previousRowGroup = previousRowData.totalExperience;
              if (total === previousRowGroup) {
                  this.rowGroupTotal[total].size++;
              } else {
                  this.rowGroupTotal[total] = {
                      index: i,
                      size: 1,
                  };
              }
          }
      }
  }
}

getDateFormatted(startDate: Date, endDate: Date) {
  if (startDate != null && endDate != null) {
     return formatDate(startDate, 'yyyy-MM-dd', 'en') + '/' + formatDate(endDate, 'yyyy-MM-dd', 'en');
  } else if (startDate != null && endDate == null) {
    return formatDate(startDate, 'yyyy-MM-dd', 'en');
  } else if (endDate != null && startDate == null) {
    return formatDate(startDate, 'yyyy-MM-dd', 'en');
  } else {
    return '';
  }
}

reset() {
  this.filterForm.reset({
    age: '',
    gender: '',
    cgpa: '',
    cgpaCriteria: '',
    ageCriteria: '',
    qualification: '',
    workExperienceCriteria: '',
    workExperience: '',
    graduationYear: '',
    graduationYearCriteria: ''
  });
}
onSort() {
  this.updateFullNameRowGroupMetaData1();
        this.updateEmailRowGroupMetaData1();
        this.updateTotalRowGroupMetaData1();
}

}
