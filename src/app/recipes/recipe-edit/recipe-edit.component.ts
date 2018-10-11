import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
// import { RecipesService } from '../recipes.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as RecipeActions from "../store/recipe.actions";
import * as fromRecipes from "../store/recipe.reducers";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  index: number;
  editMode=false;
  recipeEditForm: FormGroup;

  constructor(private route: ActivatedRoute, 
    // private recipeService: RecipesService, 
    private router: Router,
    private store: Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=>{
        this.index=+params['index'];
        this.editMode=params["index"]!=null;
        console.log("ngOnInit index["+this.index+"] editMode["+this.editMode+"]");
        //this.recipe=this.recipeService.getRecipe(+params['index']);
        this.store.select("recipes")
        .take(1)
        .subscribe((recipeState: fromRecipes.State)=> {
          const recipeFromState = recipeState.recipes[this.index];
          this.recipe=recipeFromState;
          let recipeName="";
          let imagePath="";
          let description="";
          let ingredients = new FormArray([]);
      
          if(this.editMode) {
            recipeName=recipeFromState.name;
            imagePath=recipeFromState.imagePath;
            description=recipeFromState.description;
            if(recipeFromState['ingredients']){
                for (let ing of recipeFromState.ingredients){
                  ingredients.push(new FormGroup({
                    "name": new FormControl(ing.name, Validators.required),
                    "amount": new FormControl(ing.amount, [
                      Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
                    ])
                  }))
                }
            }
          }
          this.recipeEditForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(imagePath, Validators.required),
            'description': new FormControl(description, Validators.required),
            'ingredients': ingredients
          });
        });

        
        //this.initForm();
      }
      );
  }

  initForm(){
    // let recipeName="";
    // let imagePath="";
    // let description="";
    // let ingredients = new FormArray([]);

    // if(this.editMode) {
    //   recipeName=this.recipe.name;
    //   imagePath=this.recipe.imagePath;
    //   description=this.recipe.description;
    //   if(this.recipe['ingredients']){
    //       for (let ing of this.recipe.ingredients){
    //         ingredients.push(new FormGroup({
    //           "name": new FormControl(ing.name, Validators.required),
    //           "amount": new FormControl(ing.amount, [
    //             Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
    //           ])
    //         }))
    //       }
    //   }
    // }
    // this.recipeEditForm = new FormGroup({
    //   'name': new FormControl(recipeName, Validators.required),
    //   'imagePath': new FormControl(imagePath, Validators.required),
    //   'description': new FormControl(description, Validators.required),
    //   'ingredients': ingredients
    // });
  }

  onSubmit(){
    console.log(this.recipeEditForm.value);
    
    if(this.editMode){
      console.log("onSubmit index["+this.index+"] name["+this.recipeEditForm.value["name"]+"]");
      //this.recipeService.updateRecipe(this.index, this.recipeEditForm.value);
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.index, updatedRecipe: this.recipeEditForm.value}));
    } else {
      // const newRecipe = new Recipe(this.recipeEditForm.value["name"],this.recipeEditForm.value["description"],
      //   this.recipeEditForm.value["imagePath"],this.recipeEditForm.value["ingredients"]);
      // this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeEditForm.value));
    }
    // this.recipeService.storeRecipes(this.recipeService.getRecipes()).subscribe(
    //   (response)=>{console.log(response)},
    //   (error)=>{console.log(error)}
    // );
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeEditForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  onCancel(){
    //console.log("onCancel");
    this.router.navigate(["../"], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeEditForm.get("ingredients")).removeAt(index);
  }

}
