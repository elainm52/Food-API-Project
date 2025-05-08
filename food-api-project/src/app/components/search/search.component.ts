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
  ingredientList: string[] = []; // Store the parsed ingredients
  @Output() searchEvent = new EventEmitter<Recipe[]>(); // Emit recipes to the parent component

  constructor(private foodApiService: FoodApiService) {}

  searchRecipes(): void {
    this.ingredientList = this.ingredients.split(',').map(ingredient => ingredient.trim()); // Parse ingredients
    this.foodApiService.getRecipes(this.ingredientList, undefined, [], this.diet).subscribe({
      next: (response) => {
        this.searchEvent.emit(response.results); // Emit recipes to the parent component
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}