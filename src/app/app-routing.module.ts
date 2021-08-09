import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ApplyVacancyComponent } from './applicants/vacancy-post/apply-vacancy/apply-vacancy.component';
import { VacancyPostComponent } from './applicants/vacancy-post/vacancy-post.component';
import { VacancyViewComponent } from './applicants/vacancy-post/vacancy-view/vacancy-view.component';
import { RegistrationNotificationComponent } from './registration-notification/registration-notification.component';

const routes: Routes = [
    {path: '', loadChildren: () => import('./applicants/applicants.module').then(m => m.ApplicantsModule)},
    { path: 'admin', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
    { path: 'notification', component: RegistrationNotificationComponent},
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
    { path: 'verify/:token', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
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
