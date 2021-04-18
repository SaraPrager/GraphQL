import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject = new ReplaySubject<User>(1);
  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user && !!user.name));

  constructor() {
  }

  async signIn(email: string = 'fake_account@gmail.com', password: string = 'fake_password') {
    // TODO: implement
    this.subject.next({ name: 'Fake User' });
  }

  async signOut() {
    // TODO: implement
    this.subject.next(undefined);
  }
}
