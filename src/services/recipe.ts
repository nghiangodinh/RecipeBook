import { Http, Response } from '@angular/http';
import { AuthService } from './auth';
import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [];

  constructor(
    private http: Http,
    private authService: AuthService){}

  addRecipe(
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]
  ) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(
    index: number,
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]
  ) {
    this.recipes[index] = new Recipe(
      title,
      description,
      difficulty,
      ingredients
    );
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;

    return this.http
      .put(
        `https://sociallogin-971bb.firebaseio.com/${userId}/recipes.json?auth=${token}`,
        this.recipes
      )
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;

    return this.http
      .get(`https://sociallogin-971bb.firebaseio.com/${userId}/recipes.json?auth=${token}`)
      .map((response: Response) => {
        const recipes: Recipe[] = response.json() || [];
        recipes.map(r => {
          if(!r.hasOwnProperty("ingredients")) {
            r.ingredients = [];
          }
        });

        return recipes;
      })
      .do((recipes: Recipe[]) => {
        if(recipes) {
          this.recipes = recipes;
        } else {
          this.recipes = [];
        }
      });
  }

}
