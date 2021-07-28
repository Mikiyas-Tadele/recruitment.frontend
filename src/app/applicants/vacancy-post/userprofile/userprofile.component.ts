import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Education } from 'src/app/models/education.model';
import { RepositoryService } from 'src/app/models/services/repository.service';
import { Userprofile } from 'src/app/models/userprofile.model';
import { WorkExperience } from 'src/app/models/work-experience.model';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  activeMainTab = 'basicInfoTab';
education = new Education();
experience = new WorkExperience();
userprofile = new Userprofile();
experiences: WorkExperience[] = [];
educations: Education[] = [];
userProfile: Userprofile;
userForm: FormGroup;
educationForm: FormGroup;
experienceForm: FormGroup;
uploadedFiles: any[] = [];
isNewUser = true;
  constructor(private userService: UserProfileService,
     private fb: FormBuilder, private router: Router, private messageService: MessageService ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      gender: ['', Validators.required],
      dateOfBirth: [new Date(), Validators.required],
      disability: ['', Validators.required],
      mPhone1: ['', Validators.required],
      mPhone2: [''],
      fPhone: ['', Validators.required],
    });

    this.experienceForm = this.fb.group({
      position: ['', Validators.required],
      organization: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      salary: ['', Validators.required],
    });

    this.educationForm = this.fb.group ({
      fieldOfEducation: ['', Validators.required],
      qualification: ['', Validators.required],
      university: ['', Validators.required],
      yearOfGraduation: ['', Validators.required],
      cgpa: ['', Validators.required],
    });

      this.userService.getApplicant().subscribe(res => {
         this.userProfile = res;
         if (this.userProfile != null) {
           console.log(this.isNewUser);
           this.isNewUser = false;
           this.setForm(this.userProfile);
         }
      });
        console.log(this.userProfile);
  }
  get userFormControl() {
    return this.userForm.controls;
  }
  get educationFormControl() {
    return this.educationForm.controls;
  }
  get experienceFormControl() {
    return this.experienceForm.controls;
  }
  setActiveTab(event, tab) {
    this.activeMainTab = tab;
  }
  onSubmit({value, valid}: { value: Userprofile, valid: boolean }) {
    console.log(valid);
    if (valid && this.isNewUser && this.educations.length > 0 && this.uploadedFiles.length > 0) {
      value.educationalBackgrounds = this.educations;
      value.workExperiences = this.experiences;
      this.userService.saveApplicant(value).subscribe(res => {
        const formData: FormData = new FormData();
        formData.append('file', this.uploadedFiles[0], this.uploadedFiles[0].name);
        this.userService.storeFile(formData).subscribe(fileRes => {
          this.messageService.add({severity: 'success', summary: 'Saved', detail: 'Date Saved Successfully!'});
      });
        });
    } else if (valid && !this.isNewUser) {
      value.educationalBackgrounds = this.educations;
      value.workExperiences = this.experiences;
      this.userService.saveApplicant(value).subscribe(res => {
        this.messageService.add({severity: 'success', summary: 'Saved', detail: 'Date Saved Successfully!'});
      });
    } else {
      this.messageService.add({severity: 'error', summary: 'Saved', detail: 'Check for wrong data in the form'});
    }
  }
  addEducation({value, valid}: { value: Education, valid: boolean }) {
    console.log('education form submitted Valid:' + valid);
    console.log(JSON.stringify(value));
    if (valid) {
    this.educations.push(value);
    this.education = new Education();
    }
  }
  addExperiences({value, valid}: { value: WorkExperience, valid: boolean }) {
    if (valid) {
    this.experiences.push(value);
    this.experience = new WorkExperience();
    }
  }

  setForm(userProfile: Userprofile) {
    this.userForm.setValue({
      gender: userProfile.gender,
      dateOfBirth: formatDate(userProfile.dateOfBirth, 'yyyy-MM-dd', 'en'),
      disability: userProfile.disability,
      mPhone: userProfile.mPhone1,
      mPhone2: userProfile.mPhone2,
      fPhone: userProfile.fPhone,
    });
    this.educations = userProfile.educationalBackgrounds;
    this.experiences = userProfile.workExperiences;
  }

  back() {
    console.log('I am here');
    this.router.navigate(['vacancies']);
  }
  onUpload(event) {
    this.uploadedFiles.push(event.files[0]);
  }
}
