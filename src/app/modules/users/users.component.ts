import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService, User, apiUser } from '../../core/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subject,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { UserFormDialogComponent } from '../../shared/user-form-dialog/user-form-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButton,
    MatSortModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private _snackBar = inject(MatSnackBar);

  displayedColumns = ['id', 'avatar', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  totalUsers = 0;
  pageSize = 10;
  pageIndex = 0;
  sortActive = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm$ = new BehaviorSubject<string>('');
  searchControl = new FormControl('');

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.searchControl.valueChanges.subscribe((searchTerm) => {
      this.onSearchChange(searchTerm); // Your method that handles search
    });

    this.loadUsers();

    this.searchTerm$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex = 0;
        this.loadUsers();
      });
  }

  loadUsers() {
    this.loaderService.show();
    this.userService
      .getUsers(
        this.searchTerm$.getValue ? this.searchTerm$.getValue() : '',
        this.pageIndex + 1,
        this.pageSize,
        this.sortActive,
        this.sortDirection
      )
      .subscribe({
        next: (users) => {
          this.dataSource.data = users.data;
          this.totalUsers = users.total;
          this.loaderService.hide();
        },
        error: () => {
          this.loaderService.hide();
          // handle error
        },
      });
  }

  onSearchChange(searchValue: string | any) {
    this.searchTerm$.next(searchValue);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  onSortChange(event: any) {
    this.sortActive = event.active;
    this.sortDirection = event.direction || 'asc';
    this.loadUsers();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '400px',
      data: { user: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open(result.message, 'Close');
        this.loadUsers();
      }
    });
  }

  openEditDialog(user: User) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '400px',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open(result.message, 'Close');
        this.loadUsers();
      }
    });
  }

  deleteUser(user: apiUser) {
    if (confirm(`Delete user ${user.lname}, ${user.fname}?`)) {
      this.userService.deleteUser(user.id).subscribe((result) => {
        this._snackBar.open(result.message, 'Close');
        this.loadUsers();
      });
    }
  }
}
