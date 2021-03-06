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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PasswordResetComponent } from './forget-password/password-reset/password-reset.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ResetPasswordComponent } from './forget-password/reset-password/reset-password.component';

// const baseUrl = 'http://localhost:8080/api';

//  const baseUrl = 'http://10.48.8.21:8080/recruitment/api';

//  const baseUrl = 'http://jobs.dbe.com.et:9095/recruitment/api';
const baseUrl = 'https://jobs.dbe.com.et/recruitment/api';


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
        BsDatepickerModule.forRoot(),
        MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ToastModule

    ],
    declarations: [AppComponent, RegistrationNotificationComponent,
        ForgetPasswordComponent, PasswordResetComponent, ResetPasswordComponent],
    bootstrap: [AppComponent],
    providers: [AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderInterceptor,
            multi: true
          },
        { provide: 'BASE_API_URL', useValue: baseUrl }, MessageService],
})
export class AppModule {}
