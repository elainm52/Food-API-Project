import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodApiService } from '../../services/food-api.service';
import { Recipe } from '../../interfaces/food-api-response';

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
    recipe: Recipe | undefined;

    constructor(
        private route: ActivatedRoute,
        private foodApiService: FoodApiService
    ) {}

    ngOnInit(): void {
        const recipeId = Number(this.route.snapshot.paramMap.get('id'));
        this.foodApiService.getRecipeById(recipeId).subscribe(
            (data) => {
                this.recipe = data;
            },
            (error) => {
                console.error('Error fetching recipe details:', error);
            }
        );
    }
}