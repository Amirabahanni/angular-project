import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Use styleUrls, not styleUrl
})
export class HomeComponent {}
