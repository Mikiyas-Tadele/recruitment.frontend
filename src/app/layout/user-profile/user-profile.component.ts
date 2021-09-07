import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { UserModel } from 'src/app/signup/models/user.model';
import { LoginService } from 'src/app/login/login-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserAccountProfileComponent implements OnInit {

  user: UserModel;
  userForm: FormGroup;
  constructor(private userService: LoginService,
      private route: ActivatedRoute,
      private messageService: MessageService,
      private location: Location) { }

  ngOnInit() {
    this.resetUserForm();
    const username = this.route.snapshot.params['username'];
    console.log(username);
    this.userService.getUserProfile(username)
    .subscribe(res => {
      this.user = res as UserModel;
      this.setFormValues(this.user);
    });
  }

  back() {
    this.location.back();
  }

  saveUser({ valid, value }: { valid: boolean, value: UserModel }) {
    if (value.password !== value.confirmPassword) {
      this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'passwords should match'});
    } else {
      value.id = this.user.id;
      this.userService.changeProfileInfo(value).subscribe(res => {
        this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Changes Saved!'});
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Changes not saved!'});
      });
    }
  }

  resetUserForm() {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      fullName: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      conPassword: new FormControl('')
    });
  }

  setFormValues(user: UserModel) {
    this.userForm.setValue({
      id: user.id,
      fullName: user.fullName,
      username: user.email,
      password: user.password,
      conPassword: null
    });
  }

}
