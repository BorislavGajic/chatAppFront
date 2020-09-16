import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getOnline() {
    return this.http.get('http://localhost:8080/AT-Chat-war/rest/user/all');
  }
  // tslint:disable-next-line:typedef
  getAll(user) {
    return this.http.get('http://localhost:8080/AT-Chat-war/rest/message/' + user);
  }

  // tslint:disable-next-line:typedef
  isLoggedIn(user) {
    return this.http.get('http://localhost:8080/AT-Chat-war/rest/user/isLoggedIn/' + user, {
      responseType: 'text'
    });
  }
  // tslint:disable-next-line:typedef
  sendMessage(message) {
    return this.http.post('http://localhost:8080/AT-Chat-war/rest/message/send', message,      {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
    });
  }


}
