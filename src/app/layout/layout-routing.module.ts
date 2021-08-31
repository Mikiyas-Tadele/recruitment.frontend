import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppliedPersonelComponent } from './applied-personel/applied-personel.component';
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
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
