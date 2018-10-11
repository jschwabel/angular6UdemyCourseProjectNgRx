import { NgModule } from "@angular/core";

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { recipeReducer } from "./store/recipe.reducers";
import { EffectsModule } from "@ngrx/effects";
import { RecipeEffects } from "./store/recipe.effects";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        ReactiveFormsModule, 
        CommonModule, 
        RecipesRoutingModule, 
        SharedModule,
        StoreModule.forFeature("recipes", recipeReducer),
        EffectsModule.forFeature([RecipeEffects])
    ]
})
export class RecipesModule {
    
}