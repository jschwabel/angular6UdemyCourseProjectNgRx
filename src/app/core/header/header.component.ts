import { Component, OnInit } from '@angular/core';
//import { DataStorageService } from '../../shared/data-storage.service';
//import { Response } from '@angular/http';
// import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
//import { HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Observable } from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from "../../recipes/store/recipe.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(//private dataStorageService: DataStorageService, 
  //  public authService: AuthService, 
   private router: Router,
   private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select("auth");
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes().subscribe(
    //   (response: Response)=>{
    //   //(response: HttpEvent<Object>) => {
    //     console.log(response);
    //   }
    //   );
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    //this.dataStorageService.getRecipes();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
  onLogout(){
    // this.authService.logout();
    this.router.navigate(['/signin']);
    this.store.dispatch(new AuthActions.Logout());
  }

}
