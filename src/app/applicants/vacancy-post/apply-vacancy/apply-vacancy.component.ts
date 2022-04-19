import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private userProfileService: UserProfileService, private messageService: MessageService, private spinner: NgxSpinnerService) { }

  applicationForm: FormGroup;
  showValue = false;
  vacancyId: number;
  vacancyname; string;
  uploadedFiles: any[] = [];
  applicantProfile: any = [];
  private readonly QUALIFICATION_FILE = 1;
  private routeSub: Subscription;
  applySubmitted = false;
  showUpload = true;
  ngOnInit() {
    this.applicationForm = this.fb.group({
      applicationLetter: ['', Validators.required]
    });

    this.routeSub = this.route.params.subscribe(params => {
       this.vacancyId = params['id'];
       this.vacancyname = params['name'];
    });
  }
  get applicationFormControl() {
    return this.applicationForm.controls;
  }
  onSubmit({value, valid}: { value: Application, valid: boolean }) {
    this.spinner.show();
    console.log(value);
    if (valid && this.uploadedFiles.length > 0) {
      this.applySubmitted = true;
      value.vacancyId = this.vacancyId;
      this.userProfileService.apply(value).subscribe(res => {
        const savedModel = res as Application;
        setTimeout(() => {
          this.messageService.add({severity: 'success', summary: 'Error', detail: 'You have successfully applied!'});
        }, 100);
        this.applySubmitted = false;
        this.spinner.hide();
        this.router.navigate(['appliedJobs']);
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.message});
        this.applySubmitted = false;
        this.spinner.hide();
      }
      );
    } else {
      this.messageService.add({severity: 'error', summary: 'Success', detail: 'Application Letter not entered and/or File not uploaded!'});
      this.applySubmitted = false;
      this.spinner.hide();
    }

  }

  onUpload(event) {
    this.uploadedFiles.push(event.files[0]);
    const formData: FormData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.showValue = true;
    this.showUpload = false;
    this.userProfileService.storeFile(formData, this.vacancyId).subscribe(fileRes => {
      this.messageService.add({severity: 'success', summary: 'Upload File', detail: 'File Successfully Uploaded'});
      this.showValue = false;
      this.showUpload = true;
  }, err => {
    this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.message});
    this.showValue = false;
    this.showUpload = true;
  }
  );
  }

}
