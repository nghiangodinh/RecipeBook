import { RecipeService } from "./../../services/recipe";
import { ShoppingListService } from "./../../services/shopping-list";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Component, OnInit } from "@angular/core";

import { Recipe } from "./../../models/recipe";
import { RecipeEditPage } from "../pages";

@IonicPage()
@Component({
  selector: "page-recipe",
  templateUrl: "recipe.html"
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.recipe = this.navParams.get("recipe");
    this.index = this.navParams.get("index");
  }

  onAddIngredients() {
    this.shoppingListService.addItems(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.navCtrl.push(RecipeEditPage, {
      mode: "Edit",
      recipe: this.recipe,
      index: this.index
    });
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot()
  }
}
