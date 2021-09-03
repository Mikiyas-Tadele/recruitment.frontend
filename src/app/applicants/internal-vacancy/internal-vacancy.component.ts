import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InternalVacancyService } from 'src/app/layout/post-vacancy/internal-vacancies/internal-vacancy.service';
import { Employee } from 'src/app/models/employee';
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
  employeeinfo: Employee = new Employee();
  constructor(private internalVacancyService: InternalVacancyService,
     private router: Router,
     private messageService: MessageService,
     private confirmMessage: ConfirmationService,
     private tokenStorage: TokenStorage) { }

  ngOnInit() {
   this.getVacancies();
   this.internalVacancyService.getEmployeeInfo(this.tokenStorage.getUserName()).subscribe(res => {
     this.employeeinfo = res as Employee;
   });
  }

  private getVacancies() {
   this.internalVacancyService.getAllInternalVacancies().subscribe(res => {
     this.vacancies = res as InternalVacancyModel[];
   });
 }

apply(data: InternalVacancyModel) {
    if (this.applies.length < 3) {
      if (this.applies.length > 0) {
        this.applies = this.applies.filter(d => {
          return data.id !== d.id;
      });
      }
      if (this.uploadedFilesForVacancy.has(data.id)) {
      this.applies.push(data);
      } else {
        this.messageService.add({severity: 'error', summary: 'Upload File', detail: 'Please Attach the file first before applying'});
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
  console.log(this.uploadedFilesForVacancy.entries());
  if (this.uploadedFilesForVacancy.size === 3) {
    this.confirmMessage.confirm({
      message: 'You have Selected and uploaded a letter for three positions. Are you sure you want to submit the application?',
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
            summary: 'Saved',
            detail: 'You have successfuly applied for the position you selected',
        });
         this.tokenStorage.signOut();
         this.router.navigate(['/login']);
         });
      }
  });
  } else {
    this.messageService.add({
      severity: 'error',
      summary: 'Saved',
      detail: 'You have to apply for Three Positions before submitting the form!',
  });
  }
}
upload(event: any, form: any, data: InternalVacancyModel) {
         this.uploadedFilesForVacancy.set(data.id, event.files[0]);
         this.messageService.add({severity: 'success', summary: 'Upload File',
        detail: event.files[0].name + ' File Successfully Uploaded'});
  form.clear();

}
 isFileNotUploaded() {
  this.uploadedFilesForVacancy.forEach((file: any, vacancyId: number) => {
    console.log(Array.isArray(file));
      return Array.isArray(file);
  });
 }
 validateFileSize($event: any, maxFileSize: number): void {
  if ($event.files[0].size > maxFileSize) {
    this.messageService.add({
      severity: 'error',
      summary: 'Saved',
      detail: 'The file size you selected is too large, please select a file that is within 20KB',
  });
  }
}

 }
