import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FoodApiService } from '../../services/food-api.service';
import { Recipe } from '../../interfaces/food-api-response';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  ingredients: string = '';
  diet: string = '';
  ingredientList: string[] = []; 
  
  @Output() searchEvent = new EventEmitter<Recipe[]>(); // Emit recipes to the parent component

  constructor(private foodApiService: FoodApiService) {}

  searchRecipes(): void {
    this.ingredientList = this.ingredients.split(',').map(ingredient => ingredient.trim());
    console.log('Ingredients:', this.ingredientList); // Debugging output
  
    this.foodApiService.getRecipes(this.ingredientList, undefined, [], this.diet).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        const recipeIds = response.results.map(recipe => recipe.id); // Extract recipe IDs
        const detailedRecipes: Recipe[] = [];
  
        // Fetch detailed information for each recipe
        recipeIds.forEach((id, index) => {
          this.foodApiService.getRecipeById(id).subscribe({
            next: (detailedRecipe) => {
              detailedRecipes.push(detailedRecipe);
  
              // Emit the recipes once all details are fetched
              if (index === recipeIds.length - 1) {
                this.searchEvent.emit(detailedRecipes);
              }
            },
            error: (error) => console.error('Error fetching recipe details:', error)
          });
        });
      },
      error: (error) => {
        console.error('Error:', error); // Debugging output
      }
    });
  }
}