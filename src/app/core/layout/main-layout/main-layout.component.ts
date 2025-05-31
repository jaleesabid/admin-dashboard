import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
