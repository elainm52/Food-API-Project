import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { Recipe } from './interfaces/food-api-response'; // Import Recipe interface
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, RecipeListComponent, SearchComponent], // Import RecipeListComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recipes: Recipe[] = []; 

  onSearch(recipes: Recipe[]): void {
    this.recipes = recipes; 
  }

}