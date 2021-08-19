import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, AuthError } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
    password: ['', Validators.required],
  });

  errorMessage: string = '';

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  login() {
    const { email, password } = this.loginForm.value;
    this.loading = true;
    this.authService.login(email, password).subscribe(
      (user) => {
        this.loading = false;
        this.router.navigate(['users']);
      },
      (error: AuthError) => {
        this.loading = false;
        this.errorMessage = error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}
}
