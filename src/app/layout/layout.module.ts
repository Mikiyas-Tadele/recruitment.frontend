import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MessageService} from 'primeng/api';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { VacancyPostComponent } from './vacancy-post/vacancy-post.component';
import { ApplyVacancyComponent } from './apply-vacancy/apply-vacancy.component';
import { PostVacancyComponent } from './post-vacancy/post-vacancy.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { VacancyViewComponent } from './vacancy-post/vacancy-view/vacancy-view.component';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        MessagesModule,
        MessageModule,
        NgbModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, VacancyPostComponent,
        ApplyVacancyComponent, PostVacancyComponent, UserprofileComponent, VacancyViewComponent],
    providers: [MessageService]
})
export class LayoutModule {}
