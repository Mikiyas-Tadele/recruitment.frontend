import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { AuthHeaderInterceptor } from './shared/guard/auth-header.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationNotificationComponent } from './registration-notification/registration-notification.component';

//  const baseUrl = 'http://172.18.10.145:8080/api';

const baseUrl = 'https://jobs.dbe.com.et:8443/recruitment/api';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        LanguageTranslationModule,
        AppRoutingModule,
        EditorModule,
        NgbModule,

    ],
    declarations: [AppComponent, RegistrationNotificationComponent],
    bootstrap: [AppComponent],
    providers: [AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderInterceptor,
            multi: true
          },
        { provide: 'BASE_API_URL', useValue: baseUrl }],
})
export class AppModule {}
