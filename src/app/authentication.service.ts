import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface AuthError {
  errorCode: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly REGISTERED_USERS: string = 'registered_users';
  readonly LOGGED_IN_USER: string = 'logged_in_user';

  registeredUsers: User[] = [];

  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() {
    this.registeredUsers = JSON.parse(
      sessionStorage.getItem(this.REGISTERED_USERS) || '[]'
    );
    const loggedUser = sessionStorage.getItem(this.LOGGED_IN_USER);
    if (loggedUser) {
      this.user.next(JSON.parse(loggedUser));
    }
  }

  isLoggedIn() {
    return this.user.value != null;
  }

  isEmailUsed(email: string): boolean {
    return (
      this.registeredUsers.find((user) => user.email == email) != undefined
    );
  }

  login(email: string, password: string): Observable<User> {
    let authError: AuthError | null = null;
    const user = this.registeredUsers.find((user) => user.email == email);
    if (user !== undefined) {
      if (user.password !== password) {
        authError = { errorCode: 403, message: 'email password incorrect' };
      }
    } else {
      authError = { errorCode: 400, message: 'user not registered' };
    }
    return new Observable<User>((subscriber) => {
      if (user != undefined && authError === null) {
        subscriber.next(user);
        subscriber.complete();
        sessionStorage.setItem(this.LOGGED_IN_USER, JSON.stringify(user));
        this.user.next(user);
      } else {
        subscriber.error(authError);
      }
    }).pipe(delay(1000));
  }

  logout() {
    sessionStorage.removeItem(this.LOGGED_IN_USER);
    this.user.next(null);
  }

  getRegisteredUsers(): Observable<User[]> {
    return of(this.registeredUsers);
  }

  registerUser(user: User): Observable<User> {
    if (!this.isEmailUsed(user.email)) {
      this.registeredUsers.push(user);
      sessionStorage.setItem(
        this.REGISTERED_USERS,
        JSON.stringify(this.registeredUsers)
      );
      return of(user).pipe(delay(1000));
    } else {
      return new Observable<User>((subsciber) => {
        subsciber.error({
          errorCode: 400,
          message: 'user already registered',
        } as AuthError);
      }).pipe(delay(1000));
    }
  }
}
