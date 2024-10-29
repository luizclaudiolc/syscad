import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, ILoginUser } from '../auth.service';
import { capitalize, SNACK_DEFAULT } from 'src/app/utils/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isPasswordVisible = false;
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private readonly authService: AuthService
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.formLogin.invalid) return;
    const user = this.formLogin.getRawValue() as ILoginUser;

    this.authService.loginUser(user).subscribe((res) => {
      if (res) {
        this.router.navigate(['/dashboard']);
        this.snackBar.open(
          `Bem-vindo(a) ao SysCad, ${capitalize(res.name)}!`,
          'X',
          SNACK_DEFAULT()
        );
      }
    });
  }
}
