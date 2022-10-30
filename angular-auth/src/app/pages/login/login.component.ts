import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponentsModule } from '../../components/form-components/form-components.module';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormComponentsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  submit(): void {
    this.errorMessage = '';
    this.form.markAsTouched();

    if (this.form.invalid) {
      console.log('invalid form');
      return;
    }

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.message;
      },
    });
  }
}
