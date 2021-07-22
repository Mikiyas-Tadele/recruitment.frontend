import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { VacancyPostComponent } from './vacancy-post/vacancy-post.component';
import { ApplyVacancyComponent } from './apply-vacancy/apply-vacancy.component';
import { PostVacancyComponent } from './post-vacancy/post-vacancy.component';
import { FormsModule } from '@angular/forms';
import { UserprofileComponent } from './userprofile/userprofile.component';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        FormsModule,
        NgbModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, VacancyPostComponent, ApplyVacancyComponent, PostVacancyComponent, UserprofileComponent]
})
export class LayoutModule {}
