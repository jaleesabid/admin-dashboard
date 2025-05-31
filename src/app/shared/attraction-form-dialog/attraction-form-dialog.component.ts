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
import { User, apiUser } from '../../core/services/user.service';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  Attractions,
  AttractionService,
} from '../../core/services/attractions.service';

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
  templateUrl: './attraction-form-dialog.component.html',
  styleUrl: './attraction-form-dialog.component.scss',
})
export class AttractionFormDialogComponent {
  attractionForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    detail: ['', Validators.required],
    coverimage: ['', Validators.required],
    latitude: [0, Validators.required],
    longitude: [0, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private attractionService: AttractionService,
    private dialogRef: MatDialogRef<AttractionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { attraction: Attractions | null }
  ) {}

  ngOnInit() {
    if (this.data.attraction) {
      this.attractionForm.patchValue(this.data.attraction);
    }
  }

  onSubmit() {
    if (this.attractionForm.invalid) {
      return;
    }
    const userData = this.attractionForm.value as Attractions;

    if (userData.id) {
      this.attractionService.updateAttraction(userData).subscribe((res) => {
        debugger;
        // this._snackBar.open(result.message, 'Close');
        this.dialogRef.close(res);
      });
    } else {
      this.attractionService
        .createAttraction(userData)
        .subscribe((res) => this.dialogRef.close(res));
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
