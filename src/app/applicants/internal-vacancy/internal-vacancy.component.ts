import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InternalVacancyService } from 'src/app/layout/post-vacancy/internal-vacancies/internal-vacancy.service';
import { InternalVacancyModel } from 'src/app/models/internal.vacancy.model';

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

  constructor(private internalVacancyService: InternalVacancyService,
     private router: Router,
     private messageService: MessageService,
     private confirmMessage: ConfirmationService) { }

  ngOnInit() {
   this.getVacancies();
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
      this.applies.push(data);
      this.uploadedFilesForVacancy.set(data.id, []);
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
  if (this.applies.length > 0 && this.applies.length < 3) {
    this.confirmMessage.confirm({
      message: 'You can apply for three positions but you have only applied for ' + this.applies.length +
      ' position  Are you sure you want to proceed?',
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
         });
      }
  });
  } else if (this.applies.length === 3) {
    this.confirmMessage.confirm({
      message: 'Are you sure you want to proceed?',
      accept: () => {
        this.internalVacancyService.applyForInternalPosition(this.applies).subscribe(res => {
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'You have successfuly applied for the position you selected',
        });
         });
      }
  });
   } else {
    this.messageService.add({
      severity: 'error',
      summary: 'Saved',
      detail: 'You have to apply for at least one position before submitting the form!',
  });
  }
}
upload(event: any, form: any, data: InternalVacancyModel) {
  this.uploadedFiles.push(event.files[0]);
  if (this.uploadedFilesForVacancy.has(data.id)) {
         this.uploadedFilesForVacancy.set(data.id, event.files[0]);
         this.messageService.add({severity: 'success', summary: 'Upload File', detail: 'File Successfully Uploaded'});
  } else {
    this.messageService.add({severity: 'error', summary: 'Upload File', detail: 'Please select the position before uploading'});
  }
  form.clear();

}
}
