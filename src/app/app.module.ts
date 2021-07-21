import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ApplyVacancyComponent } from './apply-vacancy/apply-vacancy.component';
import { VacancyPostComponent } from './vacancy-post/vacancy-post.component';
import { ApplicantHeaderComponent } from './applicant-header/applicant-header.component';
import { AuthHeaderInterceptor } from './shared/guard/auth-header.interceptor';

const baseUrl = 'http://localhost:8080/api';
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, ApplyVacancyComponent, VacancyPostComponent, ApplicantHeaderComponent],
    providers: [AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderInterceptor,
            multi: true
          },
        { provide: 'BASE_API_URL', useValue: baseUrl }],
    bootstrap: [AppComponent]
})
export class AppModule {}
