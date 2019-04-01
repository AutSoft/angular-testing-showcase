import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';
import { User } from './user';
import { LoginResponse } from './login-response';
import { LOCAL_STORAGE } from './local-storage.token';

describe('AuthService', () => {
  let user: User;
  let storage: Storage;

  beforeEach(() => {
    user = { id: 0, email: 'test@test.com', username: 'test' };
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        AuthService,
        { provide: LOCAL_STORAGE, useValue: localStorage }
      ]
    });
    storage = TestBed.get(LOCAL_STORAGE);
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should not be logged in if no user credentials are stored', () => {
    const service: AuthService = TestBed.get(AuthService);
    let currentUser;

    service.currentUser.subscribe(u => currentUser = u);

    expect(currentUser).toBeUndefined();
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should not be logged in if expired token is stored', () => {
    const service: AuthService = TestBed.get(AuthService);
    let currentUser;
    storeInvalidUserCredentials();

    service.currentUser.subscribe(u => currentUser = u);

    expect(currentUser).toBeUndefined();
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should be logged in if valid token is stored', () => {
    storeValidUserCredentials();
    const service: AuthService = TestBed.get(AuthService);
    let currentUser;

    service.currentUser.subscribe(u => currentUser = u);

    expect(currentUser).toEqual(user);
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should log in and store user credentials', () => {
    const service: AuthService = TestBed.get(AuthService);
    const httpTestingController = TestBed.get(HttpTestingController);

    service.logIn('test-username', 'test-password').subscribe();
    const loginRequest = httpTestingController.expectOne('api/SziaUsers/login');
    const loginResponse: LoginResponse = { id: 'TOKEN', userId: 0, created: new Date().getTime(), ttl: 1000 };
    loginRequest.flush(loginResponse);
    const userRequest = httpTestingController.expectOne(`api/SziaUsers/${user.id}`);
    userRequest.flush(user);
    let currentUser;
    service.currentUser.subscribe(u => currentUser = u);

    expect(currentUser).toBe(user);
    expect(service.isLoggedIn()).toBe(true);
    expect(storage.getItem(environment.tokenKey)).toBeDefined();
    expect(storage.getItem(environment.tokenValidityEndKey)).toBe((loginResponse.created + loginResponse.ttl * 1000).toString());
    expect(storage.getItem(environment.userKey)).toBeDefined();
  });

  it('should log out and delete user credentials', () => {
    storeValidUserCredentials();
    const service: AuthService = TestBed.get(AuthService);
    const httpTestingController = TestBed.get(HttpTestingController);
    expect(service.isLoggedIn()).toBe(true);

    service.logOut().subscribe();
    const request = httpTestingController.expectOne('api/SziaUsers/logout');
    request.flush({});
    let currentUser;
    service.currentUser.subscribe(u => currentUser = u);

    expect(currentUser).toBeUndefined;
    expect(service.isLoggedIn()).toBe(false);
    expect(storage.getItem(environment.tokenKey)).toBeFalsy();
    expect(storage.getItem(environment.tokenValidityEndKey)).toBeFalsy();
    expect(storage.getItem(environment.userKey)).toBeFalsy();
  });

  afterEach(() => {
    storage.clear();
  });

  const storeValidUserCredentials = () => {
    storeUserCredentials('token', (new Date().getTime() + 100000).toString(), JSON.stringify(user));
  }
  
  const storeInvalidUserCredentials = () => {
    storeUserCredentials('token', (new Date().getTime() - 1).toString(), '');
  }
  
  const storeUserCredentials = (token: string, tokenValidityEnd: string, user: string) => {
    localStorage.setItem(environment.tokenKey, token);
    localStorage.setItem(environment.tokenValidityEndKey, tokenValidityEnd);
    localStorage.setItem(environment.userKey, user);
  }

});
