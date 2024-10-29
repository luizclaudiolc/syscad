import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, ICreateUser } from '../auth.service';
import { capitalize, SNACK_DEFAULT } from 'src/app/utils/helpers';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  isPasswordVisibleOne = false;
  isPasswordVisibleTwo = false;
  formCreateUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.formCreateUser = this.fb.group(
      {
        first_name: ['', Validators.required],
        last_name: [''],
        position: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  create() {
    if (this.formCreateUser.invalid) return;
    const _user = this.formCreateUser.getRawValue();
    for (const [key, value] of Object.entries(_user)) {
      if (key === 'confirmPassword') delete _user[key];
    }

    const user = _user as ICreateUser;

    this.authService.createUser(user).subscribe((res) => {
      if (res) {
        this.router.navigate(['/login']);
        this.snackBar.open(
          `${capitalize(
            res.first_name
          )}, Sua conta foi criada com suceso! Acesse o sistema!`,
          'X',
          SNACK_DEFAULT()
        );
      }
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }
}
