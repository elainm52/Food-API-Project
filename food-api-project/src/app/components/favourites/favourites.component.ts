import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  favourites: any[] = [];

  constructor(private http: HttpClient) {}

 ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5050/api/favorites').subscribe({
      next: (data) => {
        this.favourites = data;
      },
      error: (err) => {
        console.error('Error fetching favorites:', err);
      }
    });
  }
}
