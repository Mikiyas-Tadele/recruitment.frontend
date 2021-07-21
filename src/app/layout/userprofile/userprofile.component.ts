import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education.model';
import { RepositoryService } from 'src/app/models/services/repository.service';
import { Userprofile } from 'src/app/models/userprofile.model';
import { WorkExperience } from 'src/app/models/work-experience.model';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  activeMainTab = 'basicInfoTab';
education = new Education();
experience = new WorkExperience();
userprofile = new Userprofile(this.education, this.experience);
url = '/api';
  constructor(private repo: RepositoryService) { }

  ngOnInit() {
  }
  setActiveTab(event, tab) {
    this.activeMainTab = tab;
  }
  save() {
     this.repo.saveApplication(this.userprofile, this.url);
  }
}
