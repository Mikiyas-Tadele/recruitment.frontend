import { formatDate } from '@angular/common';
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
private readonly qualificationLookupCode = 'QUALIFICATION';
private readonly CV_FILE = 0;
  constructor(private userService: UserProfileService,
     private fb: FormBuilder, private router: Router, private messageService: MessageService ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [''],
      gender: ['', Validators.required],
      dateOfBirth: [new Date(), Validators.required],
      disability: ['', Validators.required],
      disabilityDescription: [''],
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
      specialization: [''],
      qualification: ['', Validators.required],
      university: ['', Validators.required],
      yearOfGraduation: ['', Validators.required],
      cgpa: ['', Validators.required],
    });

    this.certificationForm = this.fb.group({
      title: ['', Validators.required],
      institution: ['', Validators.required],
      awardedDate: ['', Validators.required]
    });
    this.loadQualificationLookups();

      this.userService.getApplicant().subscribe(res => {
         this.userProfile = res;
         if (this.userProfile != null) {
           console.log(this.isNewUser);
           this.isNewUser = false;
           this.setForm(this.userProfile);
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
    if (valid && value.id != null && this.educations.length > 0 && this.uploadedFiles.length > 0) {
      value.educationalBackgrounds = this.educations;
      value.workExperiences = this.experiences;
      this.userService.saveApplicant(value).subscribe(res => {
        const formData: FormData = new FormData();
        formData.append('file', this.uploadedFiles[0], this.uploadedFiles[0].name);
        this.userService.storeFile(formData, this.CV_FILE).subscribe(fileRes => {
          this.messageService.add({severity: 'success', summary: 'Saved', detail: 'Date Saved Successfully!'});
          this.enableDisablity = false;
      });
        });
        this.userForm.reset();
        this.educationForm.reset();
        this.experienceForm.reset();
    } else if (valid && value.id != null) {
       this.userService.saveApplicant(value).subscribe(res => {
        this.messageService.add({severity: 'success', summary: 'Saved', detail: 'Date Updated Successfully!'});
        this.enableDisablity = false;
       });
    } else if (this.educations.length === 0 || this.uploadedFiles.length === 0) {
      this.messageService.add({severity: 'error', summary: 'Saved',
      detail: 'You have not added either education background or uploaded a CV'});
    } else {
      this.messageService.add({severity: 'error', summary: 'Saved', detail: 'Check for wrong data in the form'});
    }
  }
  addEducation({value, valid}: { value: Education, valid: boolean }) {
    console.log('education form submitted Valid:' + valid);
    console.log(JSON.stringify(value));
    if (valid) {
    this.educations.push(value);
    this.educationForm.reset();
    this.education = new Education();
    }
  }
  addExperiences({value, valid}: { value: WorkExperience, valid: boolean }) {
    if (valid) {
    this.experiences.push(value);
    this.experienceForm.reset();
    this.experience = new WorkExperience();
    }
  }
  addCertification({value, valid}: { value: Certification, valid: boolean }) {
    if (valid) {
      this.certifications.push(value);
      this.certificationForm.reset();
      this.certification = new Certification();
      }
  }
  editEducation(education: Education) {
    this.educationForm.setValue({
      fieldOfEducation: education.fieldOfEducation,
      specialization:education.specialization,
      qualification: education.qualification,
      university: education.university,
      yearOfGraduation: education.yearOfGraduation,
      cgpa: education.cgpa,
    });
    this.educations.forEach((value,index)=>{
      if(value == education) this.educations.splice(index,1);
    });
  }
  deleteEducation(education: Education) {
    this.educations.forEach((value,index)=>{
      if(value == education) this.educations.splice(index,1);
    });
  }
  editExperience(experience: WorkExperience) {
    this.experienceForm.setValue({
      position: experience.position,
      organization: experience.organization,
      startDate: experience.startDate ,
      endDate: experience.endDate,
      salary: experience.salary,
    });
    this.experiences.forEach((value,index)=>{
      if(value == experience) this.experiences.splice(index,1);
    });
}
deleteExperience(experience: WorkExperience) {
  this.experiences.forEach((value,index)=>{
    if(value == experience) this.experiences.splice(index,1);
  });
}
  editCertificate(certificate: Certification) {
    console.log(" Certificate: "+ JSON.stringify(certificate.awardedDate));
    this.certificationForm.setValue({
       title: certificate.title,
       institution: certificate.institution,
       awardedDate: formatDate(certificate.awardedDate, 'yyyy-MM-dd', 'en')
    });
    this.certifications.forEach((value,index)=>{
      if(value == certificate) this.certifications.splice(index,1);
  });
  }
  deleteCertificate(certificate: Certification) {
    this.certifications.forEach((value,index)=>{
      if(value == certificate) this.certifications.splice(index,1);
  });
  }
  setForm(userProfile: Userprofile) {
    this.userForm.setValue({
      gender: userProfile.gender,
      dateOfBirth: formatDate(userProfile.dateOfBirth, 'yyyy-MM-dd', 'en'),
      disability: userProfile.disability,
      disabilityDescription: userProfile.disabilityDescription,
      mPhone1: userProfile.mPhone1,
      mPhone2: userProfile.mPhone2,
      fPhone: userProfile.fPhone,
      id: userProfile.id
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

  loadQualificationLookups() {
    this.userService.getLookkups(this.qualificationLookupCode).subscribe(res => {
      const results = res as LookupDetail[];
      for (let index = 0; index < results.length; index++) {
        const element = results[index];
        const q = {label: element.description, value: element.id};
        this.qualifications.push(q);
      }

    });
  }

  checkDisablity(event) {
   this.enableDisablity = event === 'Yes' ? true : false;
   console.log(this.enableDisablity);
  }
}
