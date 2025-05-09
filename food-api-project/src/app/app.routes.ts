import { Routes } from '@angular/router';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

export const routes: Routes = [ // Add export here
  { path: 'recipe/:id', component: RecipeDetailsComponent }
];