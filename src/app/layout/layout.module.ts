import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmationService, MessageService} from 'primeng/api';
import {EditorModule} from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { PostVacancyComponent } from './post-vacancy/post-vacancy.component';
import { VacancyDetailComponent } from './post-vacancy/vacancy-detail/vacancy-detail.component';
import { AppliedPersonelComponent } from './applied-personel/applied-personel.component';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { AuthGuard } from '../shared';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from '../shared/guard/auth-header.interceptor';
import { InternalVacanciesComponent } from './post-vacancy/internal-vacancies/internal-vacancies.component';
import { InternalVacancyFormComponent } from './post-vacancy/internal-vacancies/internal-vacancy-form/internal-vacancy-form.component';
import { InternalApplicantsComponent } from './post-vacancy/internal-vacancies/internal-applicants/internal-applicants.component';
import { InternalApplicantsByPositionComponent } from './internal-applicants-by-position/internal-applicants-by-position.component';
import { InternalPositionByApplicantComponent } from './internal-position-by-applicant/internal-position-by-applicant.component';
import { InternalApplicantsByNonManagerialPositionComponent } from './internal-applicants-by-non-managerial-position/internal-applicants-by-non-managerial-position.component';
import { InternalNonManagerialPositionByApplicantComponent } from './internal-non-managerial-position-by-applicant/internal-non-managerial-position-by-applicant.component';
import { UserAccountProfileComponent } from './user-profile/user-profile.component';
import { ApplicantForWrittenExamComponent } from './applicant-for-written-exam/applicant-for-written-exam.component';
import { ApplicantsForInterviewComponent } from './applicants-for-interview/applicants-for-interview.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbModule,
        NgbDropdownModule,
        BsDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        ToastModule,
        MessagesModule,
        MessageModule,
        EditorModule,
        ButtonModule,
        PanelModule,
        PanelModule,
        ToastModule,
        ButtonModule,
        MenuModule,
        TooltipModule,
        DialogModule,
        DropdownModule,
        DataViewModule,
        NgbDatepickerModule,
        CalendarModule,
        ConfirmDialogModule


    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent,
         PostVacancyComponent, VacancyDetailComponent, AppliedPersonelComponent,
         InternalVacanciesComponent, InternalVacancyFormComponent,
         InternalApplicantsComponent, InternalApplicantsByPositionComponent,
          InternalPositionByApplicantComponent,
          InternalApplicantsByNonManagerialPositionComponent,
          InternalNonManagerialPositionByApplicantComponent, UserAccountProfileComponent,
           ApplicantForWrittenExamComponent, ApplicantsForInterviewComponent],
    providers: [MessageService, ConfirmationService,
        [AuthGuard,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthHeaderInterceptor,
                multi: true
              }, ]]
})
export class LayoutModule {}
