import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import User from '../models/user';

const URL = 'http://localhost:3000/login'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject = new ReplaySubject<User>(1);
  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user && !!user.name));

  accessToken: string = '';
  constructor() {
  }

  async signIn(email: string = 'fake_account@gmail.com', password: string = 'fake_password') {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const responseBody = await response.json();
    this.accessToken = responseBody.token;
    this.subject.next({ name: 'Fake User' });
  }

  async signOut() {
    // TODO: implement
    this.subject.next(undefined);
  }
}
