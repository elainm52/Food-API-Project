import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { FoodApiResponse, Recipe } from '../interfaces/food-api-response';


@Injectable({
  providedIn: 'root'
})
export class FoodApiService {

  private apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private apiKey = 'b2d8bb37dede437f90ddb167ac0e3bf4';
  
  
  constructor(private http: HttpClient) {}

   getRecipes(
    ingredients: string[],
    maxReadyTime?: number,
    intolerances?: string[],
    diet?: string
  ): Observable<FoodApiResponse> {
    let params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('addRecipeInformation', 'true')
      .set('addRecipeNutrition', 'true')
      .set('number', '10'); 

    // Add optional parameters
    if (ingredients.length > 0) {
      params = params.set('includeIngredients', ingredients.join(','));
    }
    if (maxReadyTime) {
      params = params.set('maxReadyTime', maxReadyTime.toString());
    }
    if (intolerances && intolerances.length > 0) {
      params = params.set('intolerances', intolerances.join(','));
    }
    if (diet) {
      params = params.set('diet', diet);
    }

      // Make the HTTP GET request
      return this.http.get<FoodApiResponse>(this.apiUrl, { params }).pipe(
        map((response: FoodApiResponse) => response), // Map the response to match the interface
        catchError(this.handleError) // Handle errors
      );
    }

    getRecipeById(recipeId: number): Observable<Recipe> {
      const url = `https://api.spoonacular.com/recipes/${recipeId}/information`;
      const params = new HttpParams().set('apiKey', this.apiKey);
  
      return this.http.get<Recipe>(url, { params }).pipe(
        map((response: Recipe) => response), // Map the response to match the Recipe interface
        catchError(this.handleError) // Handle errors
      );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    }

}
