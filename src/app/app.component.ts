import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'sunday-mobility';

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((val) => console.log(val));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
