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
import {MessageService} from 'primeng/api';
import {EditorModule} from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { PostVacancyComponent } from './post-vacancy/post-vacancy.component';
import { VacancyDetailComponent } from './post-vacancy/vacancy-detail/vacancy-detail.component';
import { AppliedPersonelComponent } from './applied-personel/applied-personel.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbModule,
        NgbDropdownModule,
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
        NgbDatepickerModule,
        CalendarModule

    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent,
         PostVacancyComponent, VacancyDetailComponent, AppliedPersonelComponent],
    providers: [MessageService]
})
export class LayoutModule {}
