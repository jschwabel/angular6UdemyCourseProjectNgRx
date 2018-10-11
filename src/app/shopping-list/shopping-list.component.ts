import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from './shopping-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //ingredients:Ingredient[] = [];
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  // ingredientsChangedSubscription: Subscription;
  
  constructor(/*private shoppingListService: ShoppingListService, */
    private router: Router, private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) { 
  }

  ngOnInit() {
    //this.ingredients=this.shoppingListService.getIngredients();
    // this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ings: Ingredient[]) => {this.ingredients=ings;}
    //   );
    this.shoppingListState = this.store.select("shoppingList");
  }

  ngOnDestroy(){
    // this.ingredientsChangedSubscription.unsubscribe();
  }

  onEditIngredient(index: number){
    //this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
