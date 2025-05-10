import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { Recipe } from '../../interfaces/food-api-response';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
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
  
  onSearch(recipes: Recipe[]): void {
    this.recipes = recipes;
  }
}