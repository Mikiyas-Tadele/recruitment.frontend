import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { send } from 'process';
import { LoginService } from '../login/login-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  passwordRestForm: FormGroup;
  clicked = false;

  constructor(private userService: LoginService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.passwordRestForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

    send({ value, valid }: { value: any; valid: boolean }) {
      this.clicked = true;
      if (valid) {
         this.userService.sendReset(value.email).subscribe(res => {
          this.router.navigate(['/checkEmail']);
          this.clicked = false;
         }, err => {
          this.messageService.add({severity: 'error', summary: 'Error Message', detail: err});
          this.clicked = false;
         }
         );
      } else {
        this.clicked = false;
      }
    }

}
