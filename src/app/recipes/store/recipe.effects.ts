import { Effect, Actions } from "@ngrx/effects";
import * as RecipeActions from "../store/recipe.actions";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { Store } from "@ngrx/store";
import * as fromRecipes from "../store/recipe.reducers";

@Injectable()
export class RecipeEffects {
    
    @Effect()
    recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
        return this.httpClient.get<Recipe[]>("https://udemy-recipe-book-1977.firebaseio.com/recipes.json")
            .map((recipes)=>{
                for(let recipe of recipes) {
                if(!recipe['ingredients']) {
                    // console.log("getRecipes no ingredients ["+recipe.name+"]");
                    recipe['ingredients']=[];
                }
            }
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        })
        
    });

    @Effect({dispatch: false})
    recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select("recipes"))
    .switchMap(([action, state]) => {
        return this.httpClient.put("https://udemy-recipe-book-1977.firebaseio.com/recipes.json", 
        state.recipes);
    });

    constructor(private actions$: Actions, 
        private httpClient: HttpClient,
        private store: Store<fromRecipes.FeatureState>){}

}