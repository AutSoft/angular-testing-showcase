import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'szia-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logIn() {
    this.isLoading = true;
    this.authService.logIn(this.username, this.password)
      .subscribe(() => {
        this.isLoading = false;
        this.router.navigateByUrl('/');
      }, () => this.isLoading = false);
  }

}
