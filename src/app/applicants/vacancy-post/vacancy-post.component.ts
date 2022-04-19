import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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

  vacancies: Vacancy[] = [
    {
        'id': 411,
        'title': 'Trainee Junior Loan Officer',
        'qualification': 'Minimum of 1st Degree in Finance and Development Economics, Economics, Management, Business Administration, Accounting and Finance, Project Management or related fields.',
        'workExperience': 'No work Experience Required',
        'location': 'Nekemte District',
        'postedDate': new Date(1649827668306),
        'deadlineDate': new Date(1650432468000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 3,
        'salary': null,
        'salaryDescription': 'As per the scale of the Bank with additional attractive benefits.',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and above'
    },
    {
        'id': 409,
        'title': 'Trainee Junior Loan Officer',
        'qualification': 'Minimum of 1st Degree in Finance and Development Economics, Economics, Management, Business Administration, Accounting and Finance, Project Management or related fields.',
        'workExperience': 'No work Experience Required',
        'location': 'Gondar District',
        'postedDate': new Date(1649827504601),
        'deadlineDate': new Date(1650432304000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 3,
        'salary': null,
        'salaryDescription': ' As per the scale of the Bank with additional attractive benefits.',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and above'
    },
    {
        'id': 408,
        'title': 'Trainee Junior Civil Engineer ',
        'qualification': 'Minimum of 1st Degree in Civil Engineering, Construction Engineering and Management or related fields .',
        'workExperience': 'No work experience required',
        'location': 'Gambella District',
        'postedDate': new Date(1649827366356),
        'deadlineDate': new Date(1650432166000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 1,
        'salary': null,
        'salaryDescription': 'As per the scale of the Bank with additional attractive benefits',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and Above'
    },
    {
        'id': 407,
        'title': 'Trainee Junior Loan Officer',
        'qualification': 'Minimum of 1st Degree in Finance and Development Economics, Economics, Management, Business Administration, Accounting and Finance, Project Management or related fields.',
        'workExperience': 'No work Experience Required',
        'location': 'Gambella District',
        'postedDate': new Date(1649827339445),
        'deadlineDate': new Date(1650432139000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 3,
        'salary': null,
        'salaryDescription': 'As per the scale of the Bank with additional attractive benefits.',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and above'
    },
    {
        'id': 404,
        'title': 'Trainee Junior Mechanical Engineer',
        'qualification': 'Minimum of 1st Degree in Mechanical Engineering, Mechanical Engineering and Mechanics, Industrial Engineering or related fields',
        'workExperience': 'No work experience required',
        'location': 'Gondar District',
        'postedDate': new Date(1649827234628),
        'deadlineDate': new Date(1650380400000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 2,
        'salary': null,
        'salaryDescription': 'As per the scale of the Bank with additional attractive benefits',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and above'
    },
    {
        'id': 402,
        'title': 'Trainee Junior Mechanical Engineer',
        'qualification': 'Minimum of 1st Degree in Mechanical Engineering, Mechanical Engineering and Mechanics, Industrial Engineering or related fields',
        'workExperience': 'No work experience required',
        'location': 'Gambella District',
        'postedDate': new Date(1649827138171),
        'deadlineDate': new Date(1650380400000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 3,
        'salary': null,
        'salaryDescription': 'As per the scale of the Bank with additional attractive benefits',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and above'
    },
    {
        'id': 403,
        'title': 'Trainee Junior Loan Officer',
        'qualification': 'Minimum of 1st Degree in Finance and Development Economics, Economics, Management, Business Administration, Accounting and Finance, Project Management or related fields.',
        'workExperience': 'No work Experience Required',
        'location': 'Dessie District ',
        'postedDate': new Date(1649826336902),
        'deadlineDate': new Date(1650431136000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 3,
        'salary': null,
        'salaryDescription': 'As per the scale of the Bank with additional attractive benefits.',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and above'
    },
    {
        'id': 405,
        'title': 'Trainee Junior Civil Engineer',
        'qualification': 'Minimum of 1st Degree in Civil Engineering, Construction Engineering and Management or related fields.',
        'workExperience': 'No work experience required',
        'location': 'Dessie District',
        'postedDate': new Date(1649826051240),
        'deadlineDate': new Date(1650430851000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 2,
        'salary': null,
        'salaryDescription': 'As per the scale of the Bank with additional attractive benefits',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and Above'
    },
    {
        'id': 410,
        'title': 'Trainee Junior Civil Engineer ',
        'qualification': 'Minimum of 1st Degree in Civil Engineering, Construction Engineering and Management or related fields.',
        'workExperience': 'No work experience required',
        'location': 'Gondar District',
        'postedDate': new Date(1649826029000),
        'deadlineDate': new Date(1650430829000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 1,
        'salary': null,
        'salaryDescription': 'As per the scale of the Bank with additional attractive benefits',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and Above'
    },
    {
        'id': 412,
        'title': 'Trainee Junior Civil Engineer ',
        'qualification': 'Minimum of 1st Degree in Civil Engineering, Construction Engineering and Management or related fields.',
        'workExperience': 'No work experience required',
        'location': 'Nekemete District',
        'postedDate': new Date(1649826029000),
        'deadlineDate': new Date(1650430829000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 1,
        'salary': null,
        'salaryDescription': 'As per the scale of the Bank with additional attractive benefits',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and Above'
    },
    {
        'id': 401,
        'title': 'Trainee Junior Mechanical Engineer ',
        'qualification': 'Minimum of 1st Degree in Mechanical Engineering, Mechanical Engineering and Mechanics, Industrial Engineering or related fields ',
        'workExperience': 'No work experience required',
        'location': 'Dessie District',
        'postedDate': new Date(1649826008204),
        'deadlineDate': new Date(1650380400000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 2,
        'salary': null,
        'salaryDescription': 'As per the scale of the Bank with additional attractive benefits',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and above'
    },
    {
        'id': 406,
        'title': 'Trainee Junior Mechanical Engineer',
        'qualification': 'Minimum of 1st Degree in Mechanical Engineering, Mechanical Engineering and Mechanics, Industrial Engineering or related fields',
        'workExperience': 'No work experience required',
        'location': 'Nekemte District',
        'postedDate': new  Date(1649825992000),
        'deadlineDate': new Date (1650430792000),
        'minutesElapsedSinceCreation': '1 Day left before Deadline',
        'employmentCondition': 'Permanent',
        'requiredNumber': 2,
        'salary': null,
        'salaryDescription': 'As per the scale of the Bank with additional attractive benefits',
        'vacancyModelDetailList': [],
        'closed': false,
        'cgpa': '3.0 and above'
    }
];
  vacancyFilterForm: FormGroup;
  vacanvyTitles: any = [];
  experiences: WorkExperience[] = [];
  educations: Education[] = [];
  certifications: Certification[] = [];
  userProfile: Userprofile;
  applyClicked = false;

  constructor(private vacancyService: VancancyService,
    private router: Router, private tokenStorage: TokenStorage,
    private userService: UserProfileService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initForm();
    // this.getVacancies();

  }

  private getVacancies() {
     this.vacanvyTitles = [];
     this.spinner.show();
    this.vacancyService.getVcancies().subscribe(res => {
      this.vacancies = res as Vacancy[];
      this.spinner.hide();
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
      // fetch user profile and check if user has enough profile fille to appl for a vacancy
      this.applyClicked = true;
      this.userService.getApplicant().subscribe(userProfile => {
        this.userProfile = userProfile;
        this.experiences = userProfile.workExperiences;
        this.educations = userProfile.educationalBackgrounds;
        this.certifications = userProfile.certifications;

        this.applyClicked = false;
      },
      error => {
        console.log('Error: ' + error);
        this.applyClicked = false;
      }, () => {
        if  (this.userProfile && this.educations.length > 0 ) {
        this.router.navigate(['apply/' + data.id + '/' + data.title]);
        } else {
        this.router.navigate(['userProfile/']);
        }
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
