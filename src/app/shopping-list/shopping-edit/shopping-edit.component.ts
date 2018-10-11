import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  //@Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild("f") slForm: NgForm;
  subscription: Subscription;
  editMode=false;
  //editedItemIndex: number;
  editedItem: Ingredient;

  constructor(/*private shoppingListService: ShoppingListService,*/
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select("shoppingList").subscribe(
      data => {
        if(data.editedIngredientIndex>-1) {
          this.editedItem=data.editedIngredient;
          this.editMode=true;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode=false;
        }
      }
    );
    // this.subscription=this.shoppingListService.startedEditing.subscribe(
    //   (index:number)=>{
    //     this.editedItemIndex=index;
    //     this.editMode=true;
    //     this.editedItem=this.shoppingListService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     });
    //   }
    // );
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmt = this.amountInputRef.nativeElement.value;
    const value = form.value;
    console.log("onSubmit name["+value.name+"] amount["+value.amount+"]");
    const ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      //this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: ingredient}))
    } else {
      //this.shoppingListService.addIngredient(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    //this.ingredientAdded.emit(ingredient);
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    //this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

}
