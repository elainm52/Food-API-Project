import { Component,Input } from '@angular/core';
import { Recipe } from '../../interfaces/food-api-response';

@Component({
  selector: 'app-recipe-list',
  imports: [],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Input() recipes: Recipe[] = []; // Input property to receive recipes from the parent component
  @Input() errorMessage: string = ''; // Input property to receive error messages from the parent component

  constructor() {}

  // Method to handle recipe selection (if needed)
  onRecipeSelected(recipe: Recipe): void {
    console.log('Selected recipe:', recipe);
  }
  
}
