import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login-service.service';

@Component({
  selector: 'app-verify-link',
  templateUrl: './verify-link.component.html',
  styleUrls: ['./verify-link.component.scss']
})
export class VerifyLinkComponent implements OnInit {

  isActivated = true;

  constructor(private loginService: LoginService,
    private route: ActivatedRoute, private router: Router) {
      console.log('I am here!');
    }

  ngOnInit() {
    console.log('I am here!');
    const token = this.route.snapshot.params['token'];
    this.loginService.verifyUser(token).subscribe(
      res => {
        this.isActivated = true;
      },
      err => {
        this.isActivated = false;
      }
    );
  }

}
