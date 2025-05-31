import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatProgressSpinner,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loading = false;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.auth
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/users']);
        },
        error: () => {
          this.loading = false;
          this.error = 'Invalid username or password';
        },
      });
  }
}
