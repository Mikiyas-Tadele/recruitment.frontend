import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantComponent } from './applicant/applicant.component';
import { AppliedJobComponent } from './applied-job/applied-job.component';
import { HelpComponent } from './help/help.component';
import { FileAttachementComponent } from './internal-vacancy/file-attachement/file-attachement.component';
import { InternalVacancyFormComponent } from './internal-vacancy/internal-vacancy-form/internal-vacancy-form.component';
import { InternalVacancyComponent } from './internal-vacancy/internal-vacancy.component';
import { ApplyVacancyComponent } from './vacancy-post/apply-vacancy/apply-vacancy.component';
import { UserprofileComponent } from './vacancy-post/userprofile/userprofile.component';
import { VacancyPostComponent } from './vacancy-post/vacancy-post.component';
import { VacancyViewComponent } from './vacancy-post/vacancy-view/vacancy-view.component';

const routes: Routes = [
  {path: '',
        component: ApplicantComponent,
        children: [
  {path: 'vacancies', component: VacancyPostComponent},
  {path: 'Ivacancies', component: InternalVacancyComponent},
  {path: 'IvacanciesView', component: InternalVacancyFormComponent},
  {path: 'IApplicantFileAttachement', component: FileAttachementComponent},
  {path: 'help', component: HelpComponent},
  {path: 'vacancy-view/:id', component: VacancyViewComponent},
  {path: 'apply/:id/:name', component: ApplyVacancyComponent},
  {path: 'userProfile', component: UserprofileComponent},
  {path: 'appliedJobs', component: AppliedJobComponent},
  {path: '', redirectTo: 'vacancies', pathMatch: 'prefix' }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantsRoutingModule { }
