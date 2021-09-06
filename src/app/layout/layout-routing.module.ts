import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalApplicantByPosition } from '../models/internal.applicant.by.position';
import { AppliedPersonelComponent } from './applied-personel/applied-personel.component';
import { InternalApplicantsByNonManagerialPositionComponent } from './internal-applicants-by-non-managerial-position/internal-applicants-by-non-managerial-position.component';
import { InternalApplicantsByPositionComponent } from './internal-applicants-by-position/internal-applicants-by-position.component';
import { InternalNonManagerialPositionByApplicantComponent } from './internal-non-managerial-position-by-applicant/internal-non-managerial-position-by-applicant.component';
import { InternalPositionByApplicantComponent } from './internal-position-by-applicant/internal-position-by-applicant.component';
import { LayoutComponent } from './layout.component';
import { InternalApplicantsComponent } from './post-vacancy/internal-vacancies/internal-applicants/internal-applicants.component';
import { InternalVacanciesComponent } from './post-vacancy/internal-vacancies/internal-vacancies.component';
import { InternalVacancyFormComponent } from './post-vacancy/internal-vacancies/internal-vacancy-form/internal-vacancy-form.component';
import { PostVacancyComponent } from './post-vacancy/post-vacancy.component';
import { VacancyDetailComponent } from './post-vacancy/vacancy-detail/vacancy-detail.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {path: 'vacancyDetailForm/:vacancyId', component: VacancyDetailComponent},
            {path: 'post-vacancy/:id', component: PostVacancyComponent, data: {title: 'Post Vacancy'}},
            {path: 'appliedPersonel/:id', component: AppliedPersonelComponent},
            {path: 'internalVacancies', component: InternalVacanciesComponent},
            {path: 'internalVacancy/:id', component: InternalVacancyFormComponent},
            {path: 'appliedInternalPersonel/:id', component: InternalApplicantsComponent },
            {path: 'internalApplicantByPosition', component: InternalApplicantsByPositionComponent},
            {path: 'internalPositionByApplicant', component: InternalPositionByApplicantComponent},
            {path: 'internalApplicantByNonManagerialPosition', component: InternalApplicantsByNonManagerialPositionComponent},
            {path: 'internalNonManagerialPositionByApplicant', component: InternalNonManagerialPositionByApplicantComponent},
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
