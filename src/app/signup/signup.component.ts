import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
=======
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
>>>>>>> 8b1ddc32879fc941afa42dba77cd6848f0c8aa7f
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
<<<<<<< HEAD
    constructor(private logiService: LoginService, private fb: FormBuilder) {}
=======
    constructor(private logiService: LoginService, private messageService: MessageService) {}
>>>>>>> 8b1ddc32879fc941afa42dba77cd6848f0c8aa7f

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
                this.messageService.add({severity: 'success', summary: 'Registered', detail: 'You have successfully registered.' +
                 'Please go to your email and click the verify link. ' +
                 'Note that if the email is not on your inbox folder check it on spam folder'});
                 this.submitted = false;
            }, error => {
                this.messageService.add({severity: 'error', summary: 'Error Message', detail: error.error.message});
            });
        } else if (value.password !== value.confirmPassword) {
            this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Password must match'});
        } else {
            this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Make sure all data entered are correct'});
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
