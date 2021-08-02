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
  vacancyname; string;
  uploadedFiles: any[] = [];
  private readonly QUALIFICATION_FILE = 1;
  private routeSub: Subscription;
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
    if (valid && this.uploadedFiles.length > 0) {
      value.vacancyId = this.vacancyId;
      this.userProfileService.apply(value).subscribe(res => {
        const savedModel = res as Application;
        const formData: FormData = new FormData();
        formData.append('file', this.uploadedFiles[0], this.uploadedFiles[0].name);
        this.userProfileService.storeFile(formData, savedModel.id).subscribe(fileRes => {
          this.messageService.add({severity: 'success', summary: 'Saved', detail: 'You Have Successfully Applied'});
      });
      },
      err => {
        console.log(err);
        this.messageService.add({severity: 'error', summary: 'Saved', detail: err.error.message});
      }
      );
    } else {
      this.messageService.add({severity: 'error', summary: 'Saved', detail: 'Application Letter not entered and/or File not uploaded!'});
    }

  }

  onUpload(event) {
    this.uploadedFiles.push(event.files[0]);
  }

}
