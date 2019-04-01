import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from './login-response';
import { environment } from '../../environments/environment';
import { map, mergeMap } from 'rxjs/operators';
import { User } from './user';
import { LOCAL_STORAGE } from './local-storage.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.baseUrl}/SziaUsers`;
  currentUser = new BehaviorSubject<User>(undefined);

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: Storage) {
    if (this.isValidTokenPresent()) {
      this.currentUser.next(JSON.parse(this.storage.getItem(environment.userKey)));
    } else {
      this.clearLocalStorage();
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser.getValue() !== undefined;
  }

  logIn(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, {username, password}).pipe(mergeMap(response => {
      this.storeTokenAndValidity(response);
      return this.loadUserProfile(response.userId);
    }));
  }

  logOut() {
    return this.http.post(`${this.baseUrl}/logout`, null)
      .pipe(map(() => {
        this.clearLocalStorage();
        this.currentUser.next(undefined);
      }));
  }

  private clearLocalStorage() {
    this.storage.removeItem(environment.tokenKey);
    this.storage.removeItem(environment.tokenValidityEndKey);
    this.storage.removeItem(environment.userKey);
  }

  private loadUserProfile(userId: number) {
    return this.http.get<User>(`${this.baseUrl}/${userId}`)
      .pipe(map(currentUser => {
        this.storage.setItem(environment.userKey, JSON.stringify(currentUser));
        this.currentUser.next(currentUser);
      }));
  }

  private isValidTokenPresent() {
    const tokenValidityEnd = Number(localStorage.getItem(environment.tokenValidityEndKey));
    return  tokenValidityEnd >= new Date().getTime();
  }

  private storeTokenAndValidity(response: LoginResponse) {
    this.storage.setItem(environment.tokenKey, response.id);
    const tokenValidityEnd = new Date(response.created).getTime() + response.ttl * 1000;
    this.storage.setItem(environment.tokenValidityEndKey, tokenValidityEnd.toString());
  }
}
