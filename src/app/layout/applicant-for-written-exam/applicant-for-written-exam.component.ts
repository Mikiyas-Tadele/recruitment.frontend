import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantForWrittenExamModel } from 'src/app/models/applicant.selected.for.we';
import { AppliedPersonelService } from '../applied-personel/applied-personel.service';

@Component({
  selector: 'app-applicant-for-written-exam',
  templateUrl: './applicant-for-written-exam.component.html',
  styleUrls: ['./applicant-for-written-exam.component.scss']
})
export class ApplicantForWrittenExamComponent implements OnInit {
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
