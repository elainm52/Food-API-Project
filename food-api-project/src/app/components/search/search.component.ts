import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FoodApiService } from '../../services/food-api.service';
import { Recipe } from '../../interfaces/food-api-response';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  @Output() searchEvent = new EventEmitter<{ ingredients: string; diet: string }>();

  constructor(private foodApiService: FoodApiService) {}

  // Method to handle the search
  searchRecipes(): void {
    const ingredientList = this.ingredients.split(',').map(ingredient => ingredient.trim()); 
    this.searchEvent.emit({ ingredients: this.ingredients, diet: this.diet });
    this.foodApiService.getRecipes(ingredientList, this.maxReadyTime ?? undefined, this.intolerances, this.diet).subscribe({
      next: (response) => {
        this.recipes = response.results; 
        this.errorMessage = '';  
        console.log('Recipes:', this.recipes);
      },
      error: (error) => {
        this.errorMessage = error; 
        this.recipes = []; 
        console.error('Error:', error);
       
      }
    });
  }

  toggleIntolerance(intolerance: string): void {
    if (this.intolerances.includes(intolerance)) {
      this.intolerances = this.intolerances.filter(item => item !== intolerance);
    } else {
      this.intolerances.push(intolerance);
    }
  }
}
