import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppliedPersonelModel } from 'src/app/models/appliedPersonel.model';
import { Vacancy } from 'src/app/models/vacancy.model';
import { VancancyService } from '../post-vacancy/vacancy-detail/vancancy.service';
import { AppliedPersonelService } from './applied-personel.service';

@Component({
  selector: 'app-applied-personel',
  templateUrl: './applied-personel.component.html',
  styleUrls: ['./applied-personel.component.scss']
})
export class AppliedPersonelComponent implements OnInit {
  appliedPersonels: any = [];
  appliedPersonelsCol: any = [];
  vacancyName: string;
  constructor(private appliedPersonelService: AppliedPersonelService, private route: ActivatedRoute,
    private vacancyService: VancancyService) { }

  ngOnInit() {
    const vacancyId = this.route.snapshot.params['id'];
    this.appliedPersonelService.getAppliedPersonelForVacancy(vacancyId).subscribe(res => {
           this.appliedPersonels = res;
    });

    this.vacancyService.getVacancy(vacancyId).subscribe(res => {
        const v = res as Vacancy;
        this.vacancyName = v.title;
    });
  }

  downloadFile(data: AppliedPersonelModel) {
     this.appliedPersonelService.downloadFile(data.userId, data.fullName);
  }

}
