import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { Recipe } from '../../interfaces/food-api-response';
import { HttpClient } from '@angular/common/http';
import { FavouritesComponent } from '../favourites/favourites.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Input() recipes: Recipe[] = []; 
  @Input() errorMessage: string = ''; 

 constructor(private http: HttpClient) {}  

  onRecipeSelected(recipe: Recipe): void {
    console.log('Selected recipe:', recipe);
  }
  
  onSearch(recipes: Recipe[]): void {
    this.recipes = recipes;
  }

 addToFavourites(recipe: any): void {
  this.http
    .post('http://localhost:5050/api/favorites', recipe)
    .subscribe({
      next: () => alert('Recipe added to favorites!'),
      error: (err) => {
        console.error('Failed to save favorite:', err);
        // Log the entire error object for detailed inspection
        console.error('HTTP Error details:', err);
      }
    });
 }
   
  

 removeFromFavourites(recipe: any): void {
  this.http
    .delete(`http://localhost:5050/api/favorites/${recipe.id}`)
    .subscribe({
      next: () => alert('Recipe removed from favorites!'),
      error: (err) => console.error('Failed to remove favorite:', err)
    });
  }



}