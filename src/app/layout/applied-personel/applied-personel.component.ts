import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppliedPersonelFilter } from 'src/app/models/applied-personel-filter.model';
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
  filteredAppliedPersonels: any[];
  appliedPersonelsCol: any = [];
  vacancyName: string;
  filterForm: FormGroup;
  constructor(private appliedPersonelService: AppliedPersonelService, private route: ActivatedRoute,
    private vacancyService: VancancyService) { }

  ngOnInit() {
    this.initForm();
    const vacancyId = this.route.snapshot.params['id'];
    this.appliedPersonelService.getAppliedPersonelForVacancy(vacancyId).subscribe(res => {
           this.appliedPersonels = res;
    });
this.filteredAppliedPersonels = this.appliedPersonels;
console.log("Filtered Applied Personel: " + this.appliedPersonels)
    this.vacancyService.getVacancy(vacancyId).subscribe(res => {
        const v = res as Vacancy;
        this.vacancyName = v.title;
    });
  }

  downloadFile(data: AppliedPersonelModel) {
     this.appliedPersonelService.downloadFile(data.userId, data.fullName);
  }

  search({value, valid}: { value: AppliedPersonelFilter, valid: boolean }) {
    if(value.agecriteria === "greaterthan")
    this.filteredAppliedPersonels =  this.appliedPersonels.filter((val) => val.age >= value.age);
    else if(value.agecriteria === "lessthan")
    this.filteredAppliedPersonels =  this.appliedPersonels.filter((val) => val.age <= value.age);

  }
  initForm() {
    this.filterForm = new FormGroup({
      age: new FormControl(''),
      gender: new FormControl(''),
      cgpa: new FormControl(''),
      cgpacriteria: new FormControl(''),
      agecriteria: new FormControl(''),
    });
  }

}
