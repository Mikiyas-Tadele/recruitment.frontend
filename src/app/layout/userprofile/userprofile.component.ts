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
    console.log("Form submitted");
    if (valid) {
      value.educationalBackgrounds = this.educations;
      value.workExperiences = this.experiences;
      this.repo.saveApplication(value, this.url);
    }
    else {
      console.log("form not valid!!");
    }
  }
  addEducation({value, valid}: { value: Education, valid: boolean }) {
    console.log("education form submitted Valid:"+ valid);
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
}
