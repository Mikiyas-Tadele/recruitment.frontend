import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private token: TokenStorage) {}

    canActivate() {
        if (this.token.getUserName()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
