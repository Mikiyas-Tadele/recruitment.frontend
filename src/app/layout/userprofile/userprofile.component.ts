import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from 'src/app/models/education.model';
import { RepositoryService } from 'src/app/models/services/repository.service';
import { Userprofile } from 'src/app/models/userprofile.model';
import { WorkExperience } from 'src/app/models/work-experience.model';

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

userForm: FormGroup;
educationForm: FormGroup;
experienceForm: FormGroup;
url = '/api';
  constructor(private repo: RepositoryService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      fullName: [{value: this.userprofile.fullName, disabled: true}, Validators.required],
      email: [{value: this.userprofile.email, disabled: true}, [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      disability: ['', Validators.required],
      mPhone: ['', Validators.required],
      mPhone2: ['', Validators.required],
      fPhone: ['', Validators.required],
      // position: ['', Validators.required],
      // orgName: ['', Validators.required],
      // startDate: ['', Validators.required],
      // endDate: ['', Validators.required],
      // field: ['', Validators.required],
      // qualification: ['', Validators.required],
      // university: ['', Validators.required],
      // graduationYear: ['', Validators.required],
    });

    this.experienceForm = this.fb.group({
      position: ['', Validators.required],
      orgName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.educationForm = this.fb.group ({
      field: ['', Validators.required],
      qualification: ['', Validators.required],
      university: ['', Validators.required],
      graduationYear: ['', Validators.required],
    });
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
  onSubmit() {
    console.log("Form submitted");
    if (this.userForm.valid) {
      this.userprofile.educationalBackgrounds = this.educations;
      this.userprofile.workExperiences = this.experiences;
      this.repo.saveApplication(this.userprofile, this.url);
    }
    else {
      console.log("form not valid!!");
    }
  }
  addEducation() {
    if (this.educationForm.valid) {
    console.log("Education added " + JSON.stringify(this.education));
    this.educations.push(this.education);
    this.education = new Education();
    }
  }
  addExperiences() {
    if (this.experienceForm.valid) {
    this.experiences.push(this.experience);
    this.experience = new WorkExperience();
    }
  }
}
