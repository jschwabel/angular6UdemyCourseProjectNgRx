import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
// import { Recipe } from '../recipe.model';
//import { RecipesService } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipe from "../store/recipe.reducers";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //@Output() recipeWasSelected = new EventEmitter<Recipe>();
  //recipes: Recipe [];
  recipeState: Observable<fromRecipe.State>;
  // recipesChangedSubscription: Subscription;

  constructor(//private recipeService: RecipesService, 
    private router: Router, 
    private route: ActivatedRoute,
    private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    // this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[])=>{
    //   this.recipes=recipes;
    // });
    // this.recipes = this.recipeService.getRecipes();
    this.recipeState=this.store.select("recipes");
  }

  ngOnDestroy(){
    // this.recipesChangedSubscription.unsubscribe();
  }
 /* onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
*/

  onNewRecipe(){
    this.router.navigate(["new"], {relativeTo: this.route});
  }
}
