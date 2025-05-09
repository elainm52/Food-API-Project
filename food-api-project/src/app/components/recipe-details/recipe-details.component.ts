import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodApiService } from '../../services/food-api.service';
import { Recipe } from '../../interfaces/food-api-response';

@Component({
    selector: 'app-recipe-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
    recipe: Recipe | null = null; // Ensure the recipe can be null initially
    isLoading: boolean = true; // Add a loading indicator
    hasError: boolean = false; // Add an error flag for better UX

    constructor(
        private route: ActivatedRoute,
        private foodApiService: FoodApiService,
    ) {}

    ngOnInit(): void {
        // Get the recipe ID from the route parameters
        const recipeId = Number(this.route.snapshot.paramMap.get('id'));

        // Fetch recipe details using the food API service
        this.foodApiService.getRecipeById(recipeId).subscribe({
            next: (data) => {
                // Preprocess the data to ensure defaults are set
                this.recipe = this.processRecipeData(data);
                this.isLoading = false; // Mark as loaded
            },
            error: (error) => {
                console.error('Error fetching recipe details:', error);
                this.hasError = true; // Set the error flag
                this.isLoading = false; // Mark as loaded
            }
        });
    }

    private processRecipeData(data: Recipe): Recipe {
        return {
            ...data,
            analyzedInstructions: data.analyzedInstructions?.map((instruction) => ({
                ...instruction,
                steps: instruction.steps?.map((step) => ({
                    ...step,
                    equipment: step.equipment || [] 
                })) || [] 
            })) || [] 
        };
    }
}