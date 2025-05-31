import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private sub!: Subscription;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.sub = this.loaderService.loaderState$.subscribe((state) => {
      this.show = state;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
