import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InternalVacancyService } from 'src/app/layout/post-vacancy/internal-vacancies/internal-vacancy.service';
import { InternalApplicantByPosition } from 'src/app/models/internal.applicant.by.position';
import { InternalApplicationModel } from 'src/app/models/internal.application.model';
import { InternalVacancyModel } from 'src/app/models/internal.vacancy.model';
import { TokenStorage } from 'src/app/shared/guard/token.storage';

@Component({
  selector: 'app-file-attachement',
  templateUrl: './file-attachement.component.html',
  styleUrls: ['./file-attachement.component.scss']
})
export class FileAttachementComponent implements OnInit {
  uploadedFilesForVacancy: Map<number, any> = new Map();
  applicantsInfo: any = [];
  stopSpinner = true;
  blockedDocument = false;

  constructor(private messageService: MessageService,
    private internalVacancyService: InternalVacancyService,
    private confirmMessage: ConfirmationService,
    private tokenStorage: TokenStorage,
    private router: Router) { }

  ngOnInit() {
     this.internalVacancyService.getInternalApplicationInfo(this.tokenStorage.getUserName()).subscribe(
       res => {
          this.applicantsInfo = res as InternalApplicationModel[];
          this.stopSpinner = false;
       }
     );
  }

  upload(event: any, form: any, data: InternalApplicationModel) {
    if (this.uploadedFilesForVacancy.has(data.vacancyId)) {
      this.messageService.add({severity: 'error', summary: 'Upload File',
        detail: 'You have already attached the file for this position, please cancel first to choose another file'});
    } else {
    this.blockedDocument = true;
      const formData: FormData = new FormData();
      formData.append('file', event.files[0], event.files[0].name);
      this.internalVacancyService.storeInternalApplicationFileWithCorrection(formData, data.vacancyId).subscribe(f => {
        this.messageService.add({severity: 'success', summary: 'Upload File',
        detail: event.files[0].name + ' File Successfully Uploaded'});
        this.uploadedFilesForVacancy.set(data.vacancyId, data.position + '  file name ' + event.files[0].name);
        this.blockedDocument = false;
      }, err => {
        this.messageService.add({severity: 'error', summary: 'Upload File',
        detail: event.files[0].name + ' File not uploaded Please try Again'});
        this.blockedDocument = false;
      }
      );
    }

}

validateFileSize($event: any, maxFileSize: number): void {
  const fileTypes: any = [
    {type: 'application/msword', name: 'doc'},
    {type: 'application/pdf', name: 'pdf'},
    {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', name: 'docx'}
 ];

}
 cancel(data: InternalApplicationModel) {
   this.blockedDocument = true;
   this.internalVacancyService.deleteFile(data.vacancyId).subscribe(res => {
     this.uploadedFilesForVacancy.delete(data.vacancyId);
    this.messageService.add({severity: 'success', summary: 'Upload File',
    detail: ' File Successfully  Canceled'});
    this.blockedDocument = false;
   }, err => {
    this.messageService.add({severity: 'error', summary: 'Upload File',
    detail: 'Error in canceling the uploaded file, make sure you have attached the file before canceling'});
    this.blockedDocument = false;
   });
 }

 finishedAttaching() {
   if (this.uploadedFilesForVacancy.size > 0) {
  this.confirmMessage.confirm({
    message: 'Have you finished attaching the files?',
    accept: () => {
       this.internalVacancyService.closeFileAttachementSession().subscribe(res => {
            this.router.navigate(['/login']);
       });
    }
  });
   } else {
    this.messageService.add({severity: 'error', summary: 'Upload File',
    detail: 'You have to attach a file for at least one position'});
   }
 }

}
