import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import * as RecipeActions from "./recipe.actions";
import * as fromApp from "../../store/app.reducers";

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}
const initialState: State = { 
    recipes: [
        new Recipe('Deviled Eggs 2','Yum','https://cb-web-assets.imgix.net/getmagicbullet/img/recipe-red-pepper-deviled-eggs.jpg',
        [new Ingredient('eggs', 24),
        new Ingredient('mayonaise', 1)]),
        new Recipe('Pasta 2','Nom','https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastapenne.jpg?output-format=webp',
        [new Ingredient('pasta', 1),
        new Ingredient('sauce', 1)])
    ]
};

export function recipeReducer(state=initialState, action: RecipeActions.RecipeActions) {
    switch(action.type){
        case(RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case(RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };   
        case(RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case(RecipeActions.DELETE_RECIPE):
            const recipesMinusOne = [...state.recipes];
            recipesMinusOne.splice(action.payload, 1);
            return {
                ...state,
                recipes: recipesMinusOne
            };
        default:
            return state;    
    }
    
}