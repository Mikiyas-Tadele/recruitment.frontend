import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicantsRoutingModule } from './applicants-routing.module';
import { ApplicantComponent } from './applicant/applicant.component';
import { ApplicantHeaderComponent } from './applicant-header/applicant-header.component';
import { ApplyVacancyComponent } from './vacancy-post/apply-vacancy/apply-vacancy.component';
import { UserprofileComponent } from './vacancy-post/userprofile/userprofile.component';
import { VacancyViewComponent } from './vacancy-post/vacancy-view/vacancy-view.component';
import { VacancyPostComponent } from './vacancy-post/vacancy-post.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ConfirmationService, MessageService } from 'primeng/api';
import {FileUploadModule} from 'primeng/fileupload';
import { AppliedJobComponent } from './applied-job/applied-job.component';
import {DropdownModule} from 'primeng/dropdown';
import {DataViewModule} from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { HelpComponent } from './help/help.component';
import {CalendarModule} from 'primeng/calendar';
import { InternalVacancyComponent } from './internal-vacancy/internal-vacancy.component';
import { InternalVacancyFormComponent } from './internal-vacancy/internal-vacancy-form/internal-vacancy-form.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BlockUIModule} from 'primeng/blockui';
import { FileAttachementComponent } from './internal-vacancy/file-attachement/file-attachement.component';
import {ProgressBarModule} from 'primeng/progressbar';


@NgModule({
  declarations: [ApplicantComponent, ApplicantHeaderComponent, ApplyVacancyComponent,
    UserprofileComponent, VacancyViewComponent, VacancyPostComponent, AppliedJobComponent,
    HelpComponent, InternalVacancyComponent, InternalVacancyFormComponent, FileAttachementComponent],
  imports: [
    CommonModule,
    ApplicantsRoutingModule,
    TranslateModule,
    NgbModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    EditorModule,
    ButtonModule,
    PanelModule,
    BsDatepickerModule.forRoot(),
    FileUploadModule,
    DropdownModule,
    DataViewModule,
    TableModule,
    CalendarModule,
    ConfirmDialogModule,
    RadioButtonModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
    BlockUIModule,
    NgxSpinnerModule,
    ProgressBarModule
  ],
  providers: [MessageService, ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApplicantsModule { }
