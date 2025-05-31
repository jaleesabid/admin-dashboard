import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatFormFieldControl,
  MatLabel,
} from '@angular/material/form-field';
import { UserService, User, apiUser } from '../../core/services/user.service';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatError,
    MatDialogActions,
    ReactiveFormsModule,
    MatInput,
    CommonModule,
    MatButton,
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss',
})
export class UserFormDialogComponent {
  userForm = this.fb.group({
    id: [0],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    avatar: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User | null }
  ) {}

  ngOnInit() {
    if (this.data.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const userData = this.userForm.value as apiUser;

    if (userData.id) {
      this.userService
        .updateUser(userData)
        .subscribe((res) => this.dialogRef.close(res));
    } else {
      this.userService
        .createUser(userData)
        .subscribe((res) => this.dialogRef.close(res));
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
