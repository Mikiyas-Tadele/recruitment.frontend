import { NgModule } from '@angular/core';
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
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MessageService } from 'primeng/api';
import {FileUploadModule} from 'primeng/fileupload';
import { AppliedJobComponent } from './applied-job/applied-job.component';
import {DropdownModule} from 'primeng/dropdown';
import {DataViewModule} from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [ApplicantComponent, ApplicantHeaderComponent, ApplyVacancyComponent,
    UserprofileComponent, VacancyViewComponent, VacancyPostComponent, AppliedJobComponent, HelpComponent],
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
    FileUploadModule,
    DropdownModule,
    DataViewModule,
    TableModule
  ],
  providers: [MessageService]
})
export class ApplicantsModule { }
