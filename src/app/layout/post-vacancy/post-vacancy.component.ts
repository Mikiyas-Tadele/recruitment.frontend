import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Vacancy } from 'src/app/models/vacancy.model';

@Component({
  selector: 'app-post-vacancy',
  templateUrl: './post-vacancy.component.html',
  styleUrls: ['./post-vacancy.component.scss'],
  providers: [FormGroupDirective]
})
export class PostVacancyComponent implements OnInit {
vacancy = new Vacancy();
  constructor() { }

  ngOnInit() {
  }
save() {
  console.log(this.vacancy);
}
}
