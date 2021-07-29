import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerifyLinkComponent } from './verify-link.component';

@NgModule({
  imports: [
    CommonModule,
    VerificationRoutingModule
  ],
  declarations: [VerifyLinkComponent],
})
export class VerificationModule { }
