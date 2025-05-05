import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

export const routes: Routes = [ // Add export here
  { path: '', component: SearchComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent }
];