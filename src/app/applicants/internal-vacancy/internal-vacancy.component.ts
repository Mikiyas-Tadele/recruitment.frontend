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
          return data.id !== d;
      });
      }
      this.applies.push(data.id);
      console.log(this.applies);
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
        return data.id !== d;
    });
    console.log(this.applies);
  }
}

goToView(data: InternalVacancyModel) {

}

submit() {
  console.log(this.applies.length);
  if (this.applies.length > 0 && this.applies.length < 3) {
    this.confirmMessage.confirm({
      message: 'You can apply for three positions but you only applied for ' + this.applies.length +
      ' position  Are you sure you want to proceed?',
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

}
