import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { routerTransition } from '../router.animations';
import { TokenStorage } from '../shared/guard/token.storage';
import { LoginService } from './login-service.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    private  returnUrl: string;
    private _authToken: string;
    credentials = {username: '', password: ''};
    authenticated: FormGroup;
    authenticatedResult: boolean;
    errorMessage: string;
    session: any;
    private readonly ADMIN = 'ROLE_ADMIN';
    private readonly APPLICANT = 'ROLE_APPLICANT';

    constructor(
      public router: Router,
      private route: ActivatedRoute,
      private loginService: LoginService,
      private token: TokenStorage,
      private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loginService.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'vacancies';
        this.authenticated = new FormGroup({
          username: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required)
        });
    }
get f() {
  return this.authenticated.controls;
}
    onLoggedin({value, valid}: { value: Authenticated, valid: boolean }) {
        this.loginService.login(value.username, value.password).subscribe(
            (data) => {
               console.log(data);
                this.token.saveToken(data['accessToken']);
                this.token.setUserName(value.username);
                this.token.setAuthorities(data['authorities'][0].authority);
                // tslint:disable-next-line:triple-equals
                if (this.token.getAuthorities() === this.ADMIN) {
                  this.router.navigate(['admin/dashboard']);
                } else {
                  this.router.navigate([this.returnUrl]);
                }
              },
              error => {
                this.messageService.add({severity: 'error', summary: 'Error Message', detail: error.error.message});
              });
    }
}

export interface Authenticated {
    username: string;
    password: string;
  }
