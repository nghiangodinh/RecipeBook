import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { RecipeEditPage, RecipePage } from "../pages";
import { RecipeService } from './../../services/recipe';
import { Recipe } from "./../../models/recipe";

@IonicPage()
@Component({
  selector: "page-recipes",
  templateUrl: "recipes.html"
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recipeService: RecipeService) {}

  ionViewWillEnter() {
    this.loadItems()
  }

  private loadItems () {
    this.recipes = this.recipeService.getRecipes()
  }


  onNewRecipe() {
    this.navCtrl.push(RecipeEditPage, { mode: "New" });
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, { recipe, index })
  }
}
