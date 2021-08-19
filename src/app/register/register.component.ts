import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import {
  AuthenticationService,
  AuthError,
  User,
} from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  errorMessage = '';

  loading: boolean = false;

  registrationForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  registerUser() {
    if (this.password?.value != this.confirmPassword?.value) {
      this.confirmPassword?.setErrors({ mismatch: true });
      return;
    }
    const user = this.registrationForm.value as User;
    this.loading = true;
    this.authService.registerUser(user).subscribe(
      (user) => {
        this.authService.login(user.email, user.password).subscribe((user) => {
          this.router.navigate(['users']);
          this.loading = false;
        });
      },
      (error: AuthError) => {
        this.errorMessage = error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get mobile() {
    return this.registrationForm.get('mobile');
  }

  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  ngOnInit(): void {
    // this.registrationForm.valueChanges.subscribe((val) => console.log(val));
  }
}
