import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantForWrittenExamModel } from 'src/app/models/applicant.selected.for.we';
import { AppliedPersonelService } from '../applied-personel/applied-personel.service';

@Component({
  selector: 'app-applicants-for-interview',
  templateUrl: './applicants-for-interview.component.html',
  styleUrls: ['./applicants-for-interview.component.scss']
})
export class ApplicantsForInterviewComponent implements OnInit {
  appliedPersonels: any = [];
  vacancyTitle: string;

  constructor(private appliedService: AppliedPersonelService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const vacancyId = this.route.snapshot.params['id'];
    this.vacancyTitle = this.route.snapshot.params['title'];
    this.appliedService.getApplicantsForWrittenExam(vacancyId).subscribe(res => {
       this.appliedPersonels = res as ApplicantForWrittenExamModel[];
    });
  }

}
