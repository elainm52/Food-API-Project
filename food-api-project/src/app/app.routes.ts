import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

export const routes: Routes = [ // Add export here
  { path: 'recipe/:id', component: RecipeDetailsComponent },
  { path: '', component: RecipeListComponent },
  { path: 'favourites', component: FavouritesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { 
  
} // Add export here