import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppliedPersonelFilter } from 'src/app/models/applied-personel-filter.model';
import { AppliedPersonelModel } from 'src/app/models/appliedPersonel.model';
import { Vacancy } from 'src/app/models/vacancy.model';
import { VancancyService } from '../post-vacancy/vacancy-detail/vancancy.service';
import { AppliedPersonelService } from './applied-personel.service';

@Component({
  selector: 'app-applied-personel',
  templateUrl: './applied-personel.component.html',
  styleUrls: ['./applied-personel.component.scss']
})
export class AppliedPersonelComponent implements OnInit {
  appliedPersonels: any = [];
  filteredAppliedPersonels: any[];
  appliedPersonelsCol: any = [];
  vacancyName: string;
  filterForm: FormGroup;

  onClick(event: Event, menu) {
    menu.toggle(event);
    event.stopPropagation();
  }
  
  readonly columns = [
    'SrNo', 'Name', 'Age', 'Gender', 'Disability', 'Mobile', 'Fixed',
    'Email', 'Educational Background', 'Work Experience', 'Field of Education',
    'Qualification', 'University', 'Year of Graduation', 'CGPA', 'Organization',
    'Position', 'Salary', 'Duration', 'Total Experience (Years)'];
  constructor(private appliedPersonelService: AppliedPersonelService, private route: ActivatedRoute,
    private vacancyService: VancancyService) { }

  ngOnInit() {
    this.initForm();
    const vacancyId = this.route.snapshot.params['id'];
    this.appliedPersonelService.getAppliedPersonelForVacancy(vacancyId).subscribe(res => {
           this.appliedPersonels = res;
    });
this.filteredAppliedPersonels = this.appliedPersonels;
console.log('Filtered Applied Personel: ' + this.appliedPersonels);
    this.vacancyService.getVacancy(vacancyId).subscribe(res => {
        const v = res as Vacancy;
        this.vacancyName = v.title;
    });
  }

  downloadFile(data: AppliedPersonelModel) {
     this.appliedPersonelService.downloadFile(data.userId, data.fullName);
  }

  search({value, valid}: { value: AppliedPersonelFilter, valid: boolean }) {
    value.vacancyId = this.route.snapshot.params['id'];
    this.appliedPersonelService.advanceSearch(value).subscribe(res => {
        this.appliedPersonels = res;
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
      qualificationcriteria: new FormControl('')
    });
  }
  exportPdf() {
    import('jspdf').then(jsPDF => {
        import('jspdf-autotable').then(x => {
            const doc = new jsPDF.default(0, 0);
            doc.autoTable(this.columns, this.appliedPersonels);
            doc.save(this.vacancyName + '_applicants.pdf');
        });
    });
}

exportExcel() {
    import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.appliedPersonels);
        const workbook = { Sheets: { 'data': worksheet , 'header': this.columns}, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.vacancyName + '_applicants');
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
}

}
