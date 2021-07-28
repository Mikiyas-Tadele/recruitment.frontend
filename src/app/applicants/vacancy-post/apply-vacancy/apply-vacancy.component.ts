import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Application } from 'src/app/models/application.model';
import { RepositoryService } from 'src/app/models/services/repository.service';
import { Userprofile } from 'src/app/models/userprofile.model';
import { UserProfileService } from '../userprofile/user-profile.service';

@Component({
  selector: 'app-apply-vacancy',
  templateUrl: './apply-vacancy.component.html',
  styleUrls: ['./apply-vacancy.component.scss']
})
export class ApplyVacancyComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private userProfileService: UserProfileService, private messageService: MessageService) { }

  applicationForm: FormGroup;
  vacancyId: number;
  private routeSub: Subscription;
  ngOnInit() {
    this.applicationForm = this.fb.group({
      applicationLetter: ['', Validators.required]
    });

    this.routeSub = this.route.params.subscribe(params => {
       this.vacancyId = params['id'];
    });
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  get applicationFormControl() {
    return this.applicationForm.controls;
  }
  onSubmit({value, valid}: { value: Application, valid: boolean }) {
    if (valid) {
      value.vacancyId = this.vacancyId;
      this.userProfileService.apply(value).subscribe(res => {
        this.messageService.add({severity: 'success', summary: 'Saved', detail: 'You Have Successfully Applied'});
      },
      err => {
        console.log(err);
        this.messageService.add({severity: 'error', summary: 'Saved', detail: err.error.message});
      }
      );
    } else {
      this.messageService.add({severity: 'error', summary: 'Saved', detail: 'Application Letter not entered!'});
    }

  }

}
