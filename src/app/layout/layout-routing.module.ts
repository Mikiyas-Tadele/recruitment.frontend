import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { VacancyPostComponent } from './vacancy-post/vacancy-post.component';
import { ApplyVacancyComponent } from './apply-vacancy/apply-vacancy.component';
import { PostVacancyComponent } from './post-vacancy/post-vacancy.component';
import { Userprofile } from '../models/userprofile.model';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { VacancyViewComponent } from './vacancy-post/vacancy-view/vacancy-view.component';
import { VacancyDetailComponent } from './post-vacancy/vacancy-detail/vacancy-detail.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'vacancy', component: VacancyPostComponent, data : {title: 'Vacancies Post'}},
            {path: 'vacancyDetailForm/:vacancyId', component: VacancyDetailComponent},
            {path: 'vacancy-view/:id', component: VacancyViewComponent},
            {path: 'apply/:id', component: ApplyVacancyComponent},
            {path: 'apply', component: ApplyVacancyComponent, data : {title: 'Vacancies Post'}},
            {path: 'post-vacancy', component: PostVacancyComponent, data: {title: 'Post Vacancy'}},
            {path: 'user-profile', component: UserprofileComponent, data: {title: 'User Profile'}},
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
