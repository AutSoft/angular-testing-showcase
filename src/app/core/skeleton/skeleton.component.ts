import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user';
import { Router } from '@angular/router';

@Component({
  selector: 'szia-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {
  isMenuOpened = true;
  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => this.user = user);
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  logOut() {
    this.authService.logOut().subscribe(() => this.router.navigateByUrl('/login'));
  }
}
