import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login-service.service';
import { routerTransition } from '../router.animations';
import { UserModel } from './models/user.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    submitted = false;
    constructor(private logiService: LoginService) {}

    ngOnInit() {
        this.signupForm = new FormGroup({
          fullName: new FormControl('', Validators.required),
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', Validators.required),
          confirmPassword: new FormControl('', Validators.required)
        });
    }

    onRegister({value, valid}: { value: UserModel, valid: boolean }) {
         this.submitted = true;
        if (valid) {
            this.logiService.registerNewUser(value).subscribe(res => {
                 console.log('User Registered Successfully');
                 this.submitted = false;
            }, error => {
                console.log(error);
            });
        } else if (value.password === value.confirmPassword) {
            console.log('passwords must match');
        } else {
            console.log('Invalid Form!');
        }

    }


}
