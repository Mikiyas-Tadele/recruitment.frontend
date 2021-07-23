import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Application } from 'src/app/models/application.model';
import { RepositoryService } from 'src/app/models/services/repository.service';
import { Userprofile } from 'src/app/models/userprofile.model';

@Component({
  selector: 'app-apply-vacancy',
  templateUrl: './apply-vacancy.component.html',
  styleUrls: ['./apply-vacancy.component.scss']
})
export class ApplyVacancyComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private repo: RepositoryService) { }

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
    if(valid) {
      value.vacancyId = this.vacancyId;
      this.repo.applyJob(value);
    }

  }

}
