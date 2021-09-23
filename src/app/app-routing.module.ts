import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';
import { RegistrationNotificationComponent } from './registration-notification/registration-notification.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PasswordResetComponent } from './forget-password/password-reset/password-reset.component';
import { ResetPasswordComponent } from './forget-password/reset-password/reset-password.component';

const routes: Routes = [
    {path: '', loadChildren: () => import('./applicants/applicants.module').then(m => m.ApplicantsModule)},
    { path: 'admin', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
    { path: 'notification', component: RegistrationNotificationComponent},
    {path: 'forgetPassword', component: ForgetPasswordComponent},
    {path: 'checkEmail', component: PasswordResetComponent},
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
    { path: 'verify/:token', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
    { path: 'reset/:token', component: ResetPasswordComponent },
    { path: 'error', loadChildren: () => import('./server-error/server-error.module').then(m => m.ServerErrorModule) },
    { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
