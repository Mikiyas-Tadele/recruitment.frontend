import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Certification } from 'src/app/models/certification.model';
import { Education } from 'src/app/models/education.model';
import { Userprofile } from 'src/app/models/userprofile.model';
import { VacancieslFilter } from 'src/app/models/vacanciesl-filter.model';
import { Vacancy } from 'src/app/models/vacancy.model';
import { WorkExperience } from 'src/app/models/work-experience.model';
import { TokenStorage } from 'src/app/shared/guard/token.storage';
import { UserProfileService } from './userprofile/user-profile.service';
import { VancancyService } from './vancancy.service';

@Component({
  selector: 'app-vacancy-post',
  templateUrl: './vacancy-post.component.html',
  styleUrls: ['./vacancy-post.component.scss']
})
export class VacancyPostComponent implements OnInit {

  vacancies: Vacancy[] = [];
  vacancyFilterForm: FormGroup;
  vacanvyTitles: any = [];
  experiences: WorkExperience[] = [];
  educations: Education[] = [];
  certifications: Certification[] = [];
  userProfile: Userprofile;

  constructor(private vacancyService: VancancyService,
    private router: Router, private tokenStorage: TokenStorage, private userService: UserProfileService) { }

  ngOnInit() {
    this.initForm();
    this.getVacancies();

  }

  private getVacancies() {
     this.vacanvyTitles = [];
    this.vacancyService.getVcancies().subscribe(res => {
      this.vacancies = res as Vacancy[];
      for (let i = 0; i < this.vacancies.length; i++) {
        const element = this.vacancies[i];
        const l = { label: element.title, value: element.id };
        this.vacanvyTitles.push(l);
      }


    });
  }

  goToView(data: Vacancy) {
    this.router.navigate(['vacancy-view/' + data.id]);
  }
  apply(data: Vacancy) {
    if (this.tokenStorage.getToken() != null) {
      //fetch user profile and check if user has enough profile fille to appl for a vacancy
      
      this.userService.getApplicant().subscribe(userProfile => {
        this.userProfile = userProfile;
        this.experiences = userProfile.workExperiences;
        this.educations = userProfile.educationalBackgrounds;
        this.certifications = userProfile.certifications;
      },
      error => {
        console.log("Error: " + error)
      }, () => {
        if  (this.userProfile && this.educations.length > 0 )
        this.router.navigate(['apply/' + data.id + '/' + data.title]);
        else 
        this.router.navigate(['userProfile/']);
      });
      
    } else {
      this.router.navigate(['login']);
    }
  }
  search({value, valid}: { value: VacancieslFilter, valid: boolean }) {
    if (valid) {
     this.vacancies = this.vacancies.filter(v => {
        return v.id === value.vacancyId;
     });
    } else {
       this.getVacancies();
    }
  // this.repo.getVacancies(value.title);

  }

  clearSearch() {
    this.getVacancies();
  }
  initForm() {
    this.vacancyFilterForm = new FormGroup({
      title: new FormControl(''),
      vacancyId: new FormControl(''),
    });
}
loadData(event) {
  // event.first = First row offset
  // event.rows = Number of rows per page
}
}
