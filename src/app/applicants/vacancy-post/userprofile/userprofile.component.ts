import { formatDate } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Certification } from 'src/app/models/certification.model';
import { Education } from 'src/app/models/education.model';
import { LookupDetail } from 'src/app/models/lookup.model';
import { CustomAdapter } from 'src/app/models/services/custom-adapter.service';
import { CustomDateParserFormatter } from 'src/app/models/services/custom-date-parser-formatter.service';
import { RepositoryService } from 'src/app/models/services/repository.service';
import { Userprofile } from 'src/app/models/userprofile.model';
import { WorkExperience } from 'src/app/models/work-experience.model';
import { UserProfileService } from './user-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class UserprofileComponent implements OnInit {
  activeMainTab = 'basicInfoTab';
education = new Education();
experience = new WorkExperience();
certification = new Certification();
userprofile = new Userprofile();
experiences: WorkExperience[] = [];
educations: Education[] = [];
certifications: Certification[] = [];
userProfile: Userprofile;
userForm: FormGroup;
educationForm: FormGroup;
experienceForm: FormGroup;
certificationForm: FormGroup;
uploadedFiles: any[] = [];
isNewUser = true;
qualifications: any = [];
enableDisablity = false;
years: any = [];
phoneno = '^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$';
minDate: Date;
  maxDate: Date;
  endMinDate: Date;
  @ViewChild('tabset', { static: true }) tabset: any;
  finishSubmitted = false;
  showUpload = true;
  startDateEntered = true;

private readonly qualificationLookupCode = 'QUALIFICATION';
private readonly Grauduation_Year = 'GRY';
private readonly CV_FILE = 0;
  showValue = false;
  constructor(private userService: UserProfileService,
     private fb: FormBuilder, private router: Router,
     private messageService: MessageService,
     private spinner: NgxSpinnerService) {

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 70);
    this.maxDate.setDate(this.maxDate.getDate());
     }

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [''],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      disability: ['', Validators.required],
      disabilityDescription: [''],
      mPhone1: ['', [Validators.required]],
      mPhone2: [''],
      fPhone: [''],
    });
    this.experienceForm = this.fb.group({
      position: ['', Validators.required],
      organization: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      salary: ['', Validators.required],
      id: [''],
      applicantId: ['']
    });

    this.educationForm = this.fb.group ({
      fieldOfEducation: ['', Validators.required],
      specialization: [''],
      qualification: ['', Validators.required],
      university: ['', Validators.required],
      yearOfGraduation: ['', Validators.required],
      cgpa: ['', [Validators.required, Validators.max(4)]],
      id: [''],
      applicantId: ['']
    });

    this.certificationForm = this.fb.group({
      title: ['', Validators.required],
      institution: ['', Validators.required],
      awardDate: ['', Validators.required],
      id: [''],
      applicantId: ['']
    });
    this.loadQualificationLookups();
    this.loadYears();
    this.getUserProfile();

  }
  getUserProfile() {
    this.spinner.show();
    this.userService.getApplicant().subscribe(res => {
      this.userProfile = res;
      if (this.userProfile != null) {
        this.isNewUser = false;
        this.setForm(this.userProfile);
        this.spinner.hide();
      }
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
  get certificationFormControl() {
    return this.certificationForm.controls;
  }
  setActiveTab(event, tab) {
    this.activeMainTab = tab;
  }
  onSubmit({value, valid}: { value: Userprofile, valid: boolean }) {
    this.finishSubmitted = true;
    if (valid && this.educations.length > 0 && this.uploadedFiles.length > 0) {
      value.educationalBackgrounds = this.educations;
      value.workExperiences = this.experiences;
      value.certifications = this.certifications;
      this.userService.saveApplicant(value).subscribe(res => {
        this.enableDisablity = false;
        setTimeout(() => {
          // tslint:disable-next-line:max-line-length
          this.messageService.add({severity: 'success', summary: 'Saved', detail: 'User Profile Saved Successfully! Please go to the list of vacancies to apply for a position'});
        }, 1000);
        this.getUserProfile();
        });
    } else if (valid && value.id != null) {
      value.educationalBackgrounds = this.educations;
      value.workExperiences = this.experiences;
      value.certifications = this.certifications;
      value.dateOfBirth = formatDate(value.dateOfBirth, 'yyyy-MM-dd', 'en') as unknown as Date;
       this.userService.saveApplicant(value).subscribe(res => {
        this.messageService.add({severity: 'success', summary: 'Saved', detail: 'Date Updated Successfully!'});
        this.enableDisablity = false;
        this.finishSubmitted = false;
        this.getUserProfile();
       });
    } else if (this.educations.length === 0 || this.uploadedFiles.length === 0) {
      this.messageService.add({severity: 'error', summary: 'Saved',
      detail: 'You have not added either education background or uploaded a CV'});
      this.finishSubmitted = false;
    } else {
      console.log(valid);
      this.messageService.add({severity: 'error', summary: 'Saved', detail: 'Check for wrong data in the form'});
      this.finishSubmitted = false;
    }
  }
  addEducation({value, valid}: { value: Education, valid: boolean }) {
    if (valid) {
     value.qualificationDesc = this.getQualificationDesc(value.qualification);
    this.educations.push(value);
    this.educationForm.reset();
    this.education = new Education();
    }
  }
  addExperiences({value, valid}: { value: WorkExperience, valid: boolean }) {
    if (valid) {
      if (value.startDate <= value.endDate) {
    this.experiences.push(value);
    this.experienceForm.reset();
    this.experience = new WorkExperience();
      } else {
        this.messageService.add({severity: 'error', summary: 'Saved', detail: 'start date should be less than end date'});
      }
    }
  }
  addCertification({value, valid}: { value: Certification, valid: boolean }) {
     console.log(value.awardDate);
    if (valid) {
      this.certifications.push(value);
      this.certificationForm.reset();
      this.certification = new Certification();
      }
  }
  editEducation(education: Education) {
    this.educationForm.setValue({
      fieldOfEducation: education.fieldOfEducation,
      specialization: education.specialization,
      qualification: education.qualification,
      university: education.university,
      yearOfGraduation: education.yearOfGraduation,
      cgpa: education.cgpa,
      id: education.id,
      applicantId: education.applicantId
    });
    this.educations.forEach((value, index) => {
      if (value === education) { this.educations.splice(index, 1); }
    });
  }
  deleteEducation(education: Education) {
    this.educations.forEach((value, index) => {
      if (value === education) { this.educations.splice(index, 1); }
    });
  }
  editExperience(experience: WorkExperience) {
    this.experienceForm.setValue({
      position: experience.position,
      organization: experience.organization,
      startDate: new Date(experience.startDate),
      endDate: new Date(experience.endDate),
      salary: experience.salary,
      id: experience.id,
      applicantId: experience.applicantId
    });
    this.experiences.forEach((value, index) => {
      if (value === experience) { this.experiences.splice(index, 1); }
    });
}
deleteExperience(experience: WorkExperience) {
  this.experiences.forEach((value, index) => {
    if (value === experience) { this.experiences.splice(index, 1); }
  });
}
  editCertificate(certificate: Certification) {
    this.certificationForm.setValue({
       title: certificate.title,
       institution: certificate.institution,
       awardDate: new Date (certificate.awardDate),
       id: certificate.id,
       applicantId: certificate.applicantId
    });
    this.certifications.forEach((value, index) => {
      if (value === certificate) { this.certifications.splice(index, 1); }
  });
  }
  deleteCertificate(certificate: Certification) {
    this.certifications.forEach((value, index) => {
      if (value === certificate) { this.certifications.splice(index, 1); }
  });
  }

  setForm(userProfile: Userprofile) {
    console.log('Set Date ' + userProfile.dateOfBirth);
    this.userForm.setValue({
      gender: userProfile.gender,
      dateOfBirth: new Date(userProfile.dateOfBirth),
      disability: userProfile.disability,
      disabilityDescription: userProfile.disabilityDescription,
      mPhone1: userProfile.mPhone1,
      mPhone2: userProfile.mPhone2,
      fPhone: userProfile.fPhone,
      id: userProfile.id
    });
    this.educations = userProfile.educationalBackgrounds;
    this.experiences = userProfile.workExperiences;
    this.certifications = userProfile.certifications;
  }

  back() {
    this.router.navigate(['vacancies']);
  }
  onUpload(event) {
    this.showUpload = false;
    this.uploadedFiles.push(event.files[0]);
    const formData: FormData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.showValue = true;
    this.userService.storeFile(formData, this.CV_FILE).subscribe(fileRes => {
      this.messageService.add({severity: 'success', summary: 'Upload File', detail: 'File Successfully Uploaded'});
      this.showUpload = true;
      this.showValue = false;
  }, err => {
        this.showUpload = true;
        this.showValue = false;
  });
  }

  getQualificationDesc(qual: number) {
    for (let index = 0; index < this.qualifications.length; index++) {
      const element = this.qualifications[index];
      if (element.value === qual) {
       return element.label;
      }
    }
  }

  loadQualificationLookups() {
    this.userService.getLookkups(this.qualificationLookupCode).subscribe(res => {
      const results = res as LookupDetail[];
       results.sort((v1, v2) => {
         return v1.value - v2.value;
       });
       this.qualifications.push({label: null, value: null});
      for (let index = 0; index < results.length; index++) {
        const element = results[index];
        const q = {label: element.description, value: element.id};
        this.qualifications.push(q);
      }
    });
  }

  loadYears() {
    const startYear = 2019;
    const endYear = 2022;
    this.years.push({label: null, value: null});
    for (let index = startYear; index <= endYear; index++) {
      const year = index;
      const q = {label: year   , value: year};
      this.years.push(q);
    }
  }

  checkDisablity(event) {
   this.enableDisablity = event === 'Yes' ? true : false;
  }

  nextTab(event) {
    console.log(event);
  }

  onValueChange(value: Date): void {
    this.endMinDate = new Date(value.valueOf());
    this.endMinDate.setDate(this.endMinDate.getDate() + 1);
    this.startDateEntered = !this.startDateEntered;
  }
  showProgress() {
    this.showValue = true;
  }
}
