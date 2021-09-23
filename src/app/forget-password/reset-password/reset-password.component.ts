import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login/login-service.service';
import { UserModel } from 'src/app/signup/models/user.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  user: UserModel;
  userForm: FormGroup;
  token: any;
  constructor(private userService: LoginService,
      private route: ActivatedRoute,
      private messageService: MessageService,
      private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    this.resetUserForm();
  }

  saveUser({ valid, value }: { valid: boolean, value: UserModel }) {
    if (value.password !== value.confirmPassword) {
      this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'passwords should match'});
    } else {
      this.userService.resetPassword(this.token, value.password).subscribe(res => {
        this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Changes Saved!'});
        this.router.navigate(['/login']);
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Changes not saved!'});
      });
    }
  }

  resetUserForm() {
    this.userForm = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  setFormValues(user: UserModel) {
    this.userForm.setValue({
      password: user.password,
      confirmPassword: null
    });
  }

}
