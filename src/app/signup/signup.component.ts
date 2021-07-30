import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    constructor(private logiService: LoginService, private fb: FormBuilder) {}

    ngOnInit() {
        this.signupForm = this.fb.group({
          fullName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
          confirmPassword: ['', [Validators.required]]
        }, { 
          validator: this.ConfirmedValidator('password', 'confirmPassword')
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
    get f() {
        return this.signupForm.controls;
    }
    ConfirmedValidator(controlName: string, matchingControlName: string){
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

}
