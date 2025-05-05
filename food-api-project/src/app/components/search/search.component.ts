import { Component, EventEmitter, Output } from '@angular/core';
import { FoodApiService } from '../../services/food-api.service';
import { Recipe } from '../../interfaces/food-api-response';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  ingredients: string = ''; 
  maxReadyTime: number | null = null; 
  intolerances: string[] = []; 
  diet: string = ''; 
  recipes: Recipe[] = []; 
  errorMessage: string = ''; 

  @Output() searchEvent = new EventEmitter<Recipe[]>();

  constructor(private foodApiService: FoodApiService) {}

  // Method to handle the search
  searchRecipes(): void {
    const ingredientList = this.ingredients.split(',').map(ingredient => ingredient.trim()); 
    this.foodApiService.getRecipes(ingredientList, this.maxReadyTime ?? undefined, this.intolerances, this.diet).subscribe({
      next: (response) => {
        this.recipes = response.results; 
        this.errorMessage = ''; 
        this.searchEvent.emit(this.recipes); // Emit the recipes to the parent component
      },
      error: (error) => {
        this.errorMessage = error; 
        this.recipes = []; 
        this.searchEvent.emit([]); // Emit an empty array on error
      }
    });
  }

  // Existing toggleIntolerance method
  toggleIntolerance(intolerance: string): void {
    if (this.intolerances.includes(intolerance)) {
      this.intolerances = this.intolerances.filter(item => item !== intolerance);
    } else {
      this.intolerances.push(intolerance);
    }
  }
}
