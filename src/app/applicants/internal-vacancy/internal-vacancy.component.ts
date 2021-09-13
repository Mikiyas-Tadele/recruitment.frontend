import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { timeout } from 'rxjs/operators';
import { InternalVacancyService } from 'src/app/layout/post-vacancy/internal-vacancies/internal-vacancy.service';
import { Employee } from 'src/app/models/employee';
import { InternalManagerialPosition } from 'src/app/models/internal.managerial.positions';
import { InternalVacancyModel } from 'src/app/models/internal.vacancy.model';
import { TokenStorage } from 'src/app/shared/guard/token.storage';

@Component({
  selector: 'app-internal-vacancy',
  templateUrl: './internal-vacancy.component.html',
  styleUrls: ['./internal-vacancy.component.scss']
})
export class InternalVacancyComponent implements OnInit {

  vacancies: any = [];
  applies: any = [];
  uploadedFiles: any = [];
  isSelect = false;
  uploadedFilesForVacancy: Map<number, any> = new Map();
  employeeinfo: Employee;
  vps: any = [];
  directorates: any = [];
  ddirectorates: any = [];
  managers: any = [];
  positions: any = [];
  vacanciesUnfiltered: any = [];
  districts: any = [];
  selectedVp: any;
  selectedDirectorate: any;
  selectedDDirectorate: any;
  selectedPosition = 'manager';
  wunits: any = [];
  wunit: any;
  constructor(private internalVacancyService: InternalVacancyService,
     private router: Router,
     private messageService: MessageService,
     private confirmMessage: ConfirmationService,
     private tokenStorage: TokenStorage) {}

  ngOnInit() {
   this.getVacancies();
   this.internalVacancyService.getEmployeeInfo(this.tokenStorage.getUserName()).subscribe(res => {
     this.employeeinfo = res as Employee;
   });
  }

  private getVacancies() {
   this.internalVacancyService.getAllInternalVacancies().subscribe(res => {
     this.vacancies = res as InternalVacancyModel[];
     this.positions = res as InternalVacancyModel[];
     this.vacancies = this.vacancies.filter(d => d.parent != null);
     this.vacanciesUnfiltered = this.vacancies;
     this.fillPositions();
     this.fillWorkunits();
   });
 }

apply(data: InternalVacancyModel) {
    if (this.applies.length < 3) {
      if (this.applies.length > 0) {
        this.applies = this.applies.filter(d => {
          return data.id !== d.id;
      });
      }
      if (data.managerial === 1) {
      if (this.uploadedFilesForVacancy.has(data.id)) {
      this.applies.push(data);
      this.messageService.add({severity: 'success', summary: 'Application', detail: 'The position is added to yours application list!'});
      } else {
        this.messageService.add({severity: 'error', summary: 'Upload File', detail: 'Please Attach the file first before applying'});
      }} else {
        this.applies.push(data);
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Saved',
        detail: 'You can only apply for three positions!',
    });
    }
}

cancel(data: InternalVacancyModel) {
  if (this.applies.length > 0) {
    this.applies = this.applies.filter(d => {
        return data.id !== d.id;
    });
    this.uploadedFilesForVacancy.delete(data.id);
    console.log(this.applies);
    console.log(this.uploadedFilesForVacancy);
  }
}

goToView(data: InternalVacancyModel) {

}

submit() {
  console.log(this.applies);
  if (this.applies.length === 3) {
    this.confirmMessage.confirm({
      message: 'You have Selected and/or uploaded a letter for three positions. Are you sure you want to submit the application?',
      accept: () => {
         this.internalVacancyService.applyForInternalPosition(this.applies.map(d => {
           return d.id;
         })).subscribe(res => {
           this.uploadedFilesForVacancy.forEach((file: any, vacancyId: number) => {
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);
               this.internalVacancyService.storeInternalApplication(formData, vacancyId).subscribe(f => {
               });
           });
          this.messageService.add({
            severity: 'success',
            summary: 'Application',
            detail: 'A confirmation email is sent to your DBE mail, indicating that you have successfuly applied',
        });
        setTimeout(() => {
          this.tokenStorage.signOut();
          this.router.navigate(['/login']);
        }, 2000);
         });
      }
  });
  } else {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'You have to apply for Three Positions before submitting the application!',
  });
  }
}
upload(event: any, form: any, data: InternalVacancyModel) {
         if (this.uploadedFilesForVacancy.size < 3) {
         this.uploadedFilesForVacancy.set(data.id, event.files[0]);
         this.messageService.add({severity: 'success', summary: 'Upload File',
        detail: event.files[0].name + ' File Successfully Uploaded'});
         } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Saved',
            detail: 'You can only apply for three positions!',
        });
         }
        form.clear();

}
 isFileNotUploaded() {
  this.uploadedFilesForVacancy.forEach((file: any, vacancyId: number) => {
    console.log(Array.isArray(file));
      return Array.isArray(file);
  });
 }
 validateFileSize($event: any, maxFileSize: number): void {
  const fileTypes: any = [
    {type: 'application/msword', name: 'doc'},
    {type: 'application/pdf', name: 'pdf'},
    {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', name: 'docx'}
 ];
 const fileType = $event.files[0].type;
 console.log(fileType);
  if ($event.files[0].size > maxFileSize) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'The file size you selected is too large, please select a file that is within 20KB',
  });
}
 }

fillPositions() {
  console.log(this.positions);
     for (let index = 0; index < this.positions.length; index++) {
       const element = this.positions[index];
       if (element.parent == null) {
        const q = {label: element.position   , value: element.id};
        this.vps.push(q);
       }
     }
}

fillDirector(event: any) {
  this.directorates = [];
  this.ddirectorates = [];
  this.managers = [];
  for (let index = 0; index < this.positions.length; index++) {
    const element = this.positions[index];
    if (element.parent === event.value) {
      const q = {label: element.position   , value: element.id};
      this.directorates.push(q);
    }
  }
  this.filter(event.value);
}

fillDDirector(event: any) {
  console.log(event);
  this.ddirectorates = [];
  for (let index = 0; index < this.positions.length; index++) {
    const element = this.positions[index];
    if (element.parent === event.value) {
      const q = {label: element.position   , value: element.id};
      this.ddirectorates.push(q);
    }
  }
  this.filter(event.value);
}
fillManager(event: any) {
  console.log(event);
  this.managers = [];
  for (let index = 0; index < this.positions.length; index++) {
    const element = this.positions[index];
    if (element.parent === event.value) {
      const q = {label: element.position   , value: element.id};
      this.managers.push(q);
    }
  }
  this.filter(event.value);
}

fillNonMangerialPositions() {
  console.log('radio button ' + this.selectedPosition);
  if (this.selectedPosition === 'non-manager') {
     this.vacancies = this.vacanciesUnfiltered.filter(d => d.managerial === 0);
  } else {
    this.vacancies = this.vacanciesUnfiltered.filter(d => d.managerial === 1);
  }
}

fillWorkunits() {
  this.wunits = [];
  for (let index = 0; index < this.positions.length; index++) {
    const element = this.positions[index];
    if (element.position.startsWith('Manager,')) {
      const q = {label: element.position.replace('Manager,', '').trim()   , value: element.id};
      this.wunits.push(q);
    }
  }
}

fileName(vacancy: InternalVacancyModel) {
 return this.uploadedFilesForVacancy.has(vacancy.id) ? 'File Uploaded: ' + this.uploadedFilesForVacancy.get(vacancy.id).name : '';
}

filter(parentId: number) {
  this.vacancies = this.vacanciesUnfiltered.filter(data => {
     return data.parent === parentId;
  });
}
filterWU(event: any) {
  this.vacancies = this.vacanciesUnfiltered.filter(data => {
    return data.parent === event.value;
 });
}

resetFilter() {
  this.vacancies = this.vacanciesUnfiltered;
  this.selectedVp = null;
  this.selectedDDirectorate = null;
  this.selectedDirectorate = null;
  this.wunit = null;
}
isApplied(vacancy: InternalVacancyModel) {
   if (this.applies.includes(vacancy)) {
      return true;
   }
}

 }
