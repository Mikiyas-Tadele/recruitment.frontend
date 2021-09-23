import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TokenStorage } from '../shared/guard/token.storage';
import { UserModel } from '../signup/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticated = false;
  authenticatedResult = false;
  private _authSession: string;

  constructor(private http: HttpClient, private token: TokenStorage, @Inject('BASE_API_URL') private baseUrl: string) {
  }

  login(username: string, password: string) {

    const  authenticatedModel = {
      username: username,
      password: password
    };

    return  this.http.post(this.baseUrl + '/auth/login', authenticatedModel);
  }

  logout() {
    this._authSession = null;
    this.token.signOut();
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    this._authSession = this.getSession();
    return !!(this._authSession);
  }


  getSession(): string {
    return this.token.getToken(); // localStorage.getItem("session");
  }

  registerNewUser(data: UserModel) {
     return this.http.post(this.baseUrl + '/auth/register-user', data);
  }

  verifyUser(token: String) {
    return this.http.get(this.baseUrl + '/auth/verify/' + token);
  }

  getUserProfile(userName: string) {
    return this.http.get(this.baseUrl + '/auth/userGivenUsername/' + userName);
  }

  changeProfileInfo(data: UserModel) {
    return this.http.post(this.baseUrl + '/auth/create-user', data);
  }

  resetPassword(id: any, key: any) {
    return this.http.get(this.baseUrl + '/auth/reset/' + id + '/' + key);
  }
  sendReset(username: any) {
    return this.http.get(this.baseUrl + '/auth/send-reset/' + username);
  }



}


export class Authentication {
  status: number;
  token: string;
  roleName: string;
  roleId: number;
  userId: number;
  userName: string;
  password: string;
  fullName: string;
  description: string;

}


