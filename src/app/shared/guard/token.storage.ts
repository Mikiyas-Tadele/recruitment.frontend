import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public setUserName(username: string) {
    window.sessionStorage.setItem('user', username);
  }

  public getUserName() {
    return window.sessionStorage.getItem('user');
  }

  public setAuthorities(authorities: string) {
    window.sessionStorage.setItem('roles', authorities);
  }

  public getAuthorities() {
    return window.sessionStorage.getItem('roles');
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setStaff(staff: string) {
    window.sessionStorage.setItem('staff', staff);
  }

  public getStaff() {
    return window.sessionStorage.getItem('staff');
  }

  public getApplied() {
    return window.sessionStorage.getItem('applied');
  }

  public setApplied(applied: string) {
   window.sessionStorage.setItem('applied', applied);
  }
}
