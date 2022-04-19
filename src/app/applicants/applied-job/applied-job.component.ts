import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppliedJob } from 'src/app/models/applied.jobs.model';
import { UserProfileService } from '../vacancy-post/userprofile/user-profile.service';

@Component({
  selector: 'app-applied-job',
  templateUrl: './applied-job.component.html',
  styleUrls: ['./applied-job.component.scss']
})
export class AppliedJobComponent implements OnInit {

  appliedJobs: any = [];
  appliedJobsCols: any = [];
  hasLength = false;


  constructor(private userProfileService: UserProfileService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.spinner.show();
    this.appliedJobsCols = [
      { field: 'title', header: 'Job Title'},
      { field: 'postedDate', header: 'Vacancy Posted Date'},
      { field: 'deadlineDate', header: 'Deadline Date'},
      { field: 'appliedDate', header: 'Applied Date'},
      { field: 'status', header: 'Vacancy Status'},
    ];

     this.userProfileService.getAppliedJobs().subscribe(res => {
        this.appliedJobs = res as AppliedJob[];
        this.spinner.hide();
     });
  }

}
