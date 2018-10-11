import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from "../../shared/ingredient.model";



export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}
const initialState: State = { 
    ingredients: [
        new Ingredient("Peanut butter", 1),
        new Ingredient("Jelly", 1)],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state=initialState, 
    action: ShoppingListActions.ShoppingListActions){
    
    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state, ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state, ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            console.log("shoppingListReducer UPDATE_INGREDIENT state.editedIngredientIndex["+state.editedIngredientIndex+"] ingredient["+ingredient.name+"]")
            const updatedIngredient = {
                ...ingredient, ...action.payload.ingredient
            };
            const updatedIngredientsArr = [...state.ingredients];
            updatedIngredientsArr[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state, 
                ingredients: updatedIngredientsArr,
                editedIngredient: null,
                editedIngredientIndex: -1
            };       
        case ShoppingListActions.DELETE_INGREDIENT:
            console.log("shoppingListReducer DELETE_INGREDIENT state.editedIngredientIndex["+state.editedIngredientIndex+"]")
            const ingredientsArr = [...state.ingredients];
            ingredientsArr.splice(state.editedIngredientIndex, 1);
            return {
                ...state, ingredients: ingredientsArr,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state, 
                editedIngredient: {...state.ingredients[action.payload]},
                editedIngredientIndex: action.payload
            };  
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        default: return state;
    }
}