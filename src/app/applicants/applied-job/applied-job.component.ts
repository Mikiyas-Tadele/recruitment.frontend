import { Component, OnInit } from '@angular/core';
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


  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.appliedJobsCols = [
      { field: 'title', header: 'Job Title'},
      { field: 'postedDate', header: 'Vacancy Posted Date'},
      { field: 'deadlineDate', header: 'Deadline Date'},
      { field: 'appliedDate', header: 'Applied Date'},
      { field: 'status', header: 'Vacancy Status'},
    ];

     this.userProfileService.getAppliedJobs().subscribe(res => {
        this.appliedJobs = res as AppliedJob[];
     });
  }

}
