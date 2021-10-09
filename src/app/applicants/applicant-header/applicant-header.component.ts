import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/login/login-service.service';
import { TokenStorage } from 'src/app/shared/guard/token.storage';

@Component({
  selector: 'app-applicant-header',
  templateUrl: './applicant-header.component.html',
  styleUrls: ['./applicant-header.component.scss']
})
export class ApplicantHeaderComponent implements OnInit {

  public pushRightClass: string;
  userEmail: String;
  displayUserInfo = false;
  isNotLoggedIn = true;
  isMenuCollapsed = true;
  isStaff = false;

    constructor(private translate: TranslateService, public router: Router,
        private loginService: LoginService, private tokenStorage: TokenStorage) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        this.userEmail = this.tokenStorage.getUserName();
        this.displayUserInfo = this.tokenStorage.getAuthorities() === 'ROLE_APPLICANT' && this.tokenStorage.getAuthorities() != null;
        this.isNotLoggedIn = this.tokenStorage.getToken() == null ? true : false;
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.isStaff = this.tokenStorage.getStaff() === 'true' ? true : false;
        console.log(this.tokenStorage.getStaff());
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.loginService.logout();
    }

    gotoProfile() {
        this.router.navigate(['/userProfile']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

}
