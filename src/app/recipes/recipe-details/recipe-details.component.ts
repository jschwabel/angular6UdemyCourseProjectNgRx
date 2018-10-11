import { Component, OnInit, Input } from '@angular/core';
//import { Recipe } from '../recipe.model';
// import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { RecipesService } from '../recipes.service';
import { Store } from '@ngrx/store';
//import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
//import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
//import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs';
import * as fromRecipes from "../store/recipe.reducers";
import * as RecipeActions from "../store/recipe.actions";
import "rxjs/add/operator/take";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  //recipe: Recipe;
  recipeState: Observable<fromRecipes.State>;
  index: number;
  
  constructor(/*private shoppingListService: ShoppingListService, */
    private route: ActivatedRoute, //private recipeService: RecipesService,
    private router: Router, private store: Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
   
    this.route.params.subscribe(
      (params: Params) => {
        this.index=+params['index'];
        //this.recipe=this.recipeService.getRecipe(+params['index']);
        this.recipeState=this.store.select("recipes");
      }
    );
  }

  addIngredientsToShoppingList(){
    console.log("addIngredientsToShoppingList");
    //this.shoppingListService.addIngredients(this.recipe.ingredients);
    //this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    this.store.select("recipes")
    .take(1)
    .subscribe((recipeState: fromRecipes.State)=>{
      this.store.dispatch(new ShoppingListActions.AddIngredients(
        recipeState.recipes[this.index].ingredients
      ));
    });
  }  

  onEditRecipe() {
    this.router.navigate(["edit"], {relativeTo: this.route});
    //this.router.navigate(["../", this.recipe.index, "edit"], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    console.log("onDeleteRecipe index["+this.index+"]");
    //this.recipeService.deleteRecipe(this.index);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.index));
    this.router.navigate(["/recipes"]);
  }
}
