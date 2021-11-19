import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinalResultModel } from 'src/app/models/final.result.view';
import { AppliedPersonelService } from '../applied-personel/applied-personel.service';

@Component({
  selector: 'app-applicants-at-final-stage',
  templateUrl: './applicants-at-final-stage.component.html',
  styleUrls: ['./applicants-at-final-stage.component.scss']
})
export class ApplicantsAtFinalStageComponent implements OnInit {
  appliedPersonels: any = [];
  vacancyTitle: string;
  selectedApplicants: any = [];

  constructor(private appliedService: AppliedPersonelService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const vacancyId = this.route.snapshot.params['id'];
    this.vacancyTitle = this.route.snapshot.params['title'];
    this.appliedService.getApplicantsForFinalResult(vacancyId).subscribe(res => {
       this.appliedPersonels = res as FinalResultModel[];
    });
  }

}
