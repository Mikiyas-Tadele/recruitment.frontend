import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyLinkComponent } from './verify-link.component';

const routes: Routes = [
  {
    path: '', component: VerifyLinkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationRoutingModule { }
