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
recipe: Recipe | null = null; 

    constructor(
        private route: ActivatedRoute,
        private foodApiService: FoodApiService,
    ) {}

    ngOnInit(): void {
        const recipeId = Number(this.route.snapshot.paramMap.get('id'));
        this.foodApiService.getRecipeById(recipeId).subscribe({
            next: (data) => {
                this.recipe = data;
            },
            error: (error) => {
                console.error('Error fetching recipe details:', error);
            }
        });
    }
}